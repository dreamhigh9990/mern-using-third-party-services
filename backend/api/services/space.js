const mongoose = require('mongoose');
const shortid = require('shortid');
const BaseCrudService = require('./BaseCrudService');
const SPACE_PERMISSIONS = require('../constants/space-permissions');
const PermissionService = require('./permission');
const InvitationService = require('./invitation');
const twilio = require('../utils/twilio');
const config = require('../config');

class SpaceService extends BaseCrudService {
  constructor() {
    super(
      'Space',
      ['name', 'description', 'image', 'slug'],
      ['tier'],
      'owner',
      [
        {
          path: 'owner',
          select: 'name'
        },
        {
          path: 'permissions',
          select: 'user role',
          populate: [
            {
              path: 'user',
              select: 'name email'
            }
          ]
        },
        {
          path: 'invitations',
          select: 'user role',
          populate: [
            {
              path: 'user',
              select: 'name'
            }
          ]
        }
      ],
      [
        {
          path: 'owner',
          select: 'name'
        }
      ]
    );

    this.listAll = this.listAll.bind(this);
  }

  create(user, data) {
    const slug = shortid.generate();
    return super
      .create(user, {
        ...data,
        slug
      })
      .then(space => {
        return PermissionService.create(
          user,
          { role: SPACE_PERMISSIONS.OWNER, user },
          { space }
        ).then(() => space);
      });
  }

  remove(user, space) {
    return Promise.all([
      InvitationService.removeMany({
        space: space._id
      }),
      PermissionService.removeMany(user, {
        space: space._id
      })
    ]).then(() => super.remove(user, space));
  }

  sendLink(user, space, phone) {
    return twilio.sendSms(
      phone,
      `Here's the invite link for the memorial for ${space.name}: ${config.host}/invite/${space.slug}`
    );
  }

  listAll() {
    return Promise.all([
      this.model
        .find()
        .populate([
          { path: 'owner', select: 'name email' },
          {
            path: 'permissions',
            select: 'user role',
            populate: [{ path: 'user', select: 'name email' }]
          }
        ])
        .sort([['createdAt', 'desc']]),
      mongoose.model('Post').aggregate([
        {
          $group: {
            _id: '$space',
            count: {
              $sum: 1
            }
          }
        }
      ])
    ]).then(results => {
      const [items, posts] = results;

      return {
        posts,
        data: items
      };
    });
  }
}

module.exports = new SpaceService();
