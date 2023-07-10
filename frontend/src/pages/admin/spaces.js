import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Text } from 'rebass';
import request from 'api/request';
import { LoadingContainer, Table, TableCol, TableRow } from 'components/common';
import MainActions from 'redux/MainRedux';
import history from 'utils/history';

function AdminSpaces({ setLogin, refreshProfile }) {
  const [spaces, setSpaces] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const resp = await request('space', 'list');
      if (resp.ok) {
        setSpaces(resp.data.data);
        setPosts(resp.data.posts);
      }
      setLoading(false);
    }

    loadData();
  }, []);

  const impersonate = async user => {
    const resp = await request('user', 'impersonate', [user._id]);

    if (!resp.ok) {
      console.error(resp);
      return;
    }

    setLogin(resp.data.token);
    await refreshProfile();
    history.push('/');
  };

  return (
    <LoadingContainer loading={loading}>
      {() => (
        <Table>
          <thead>
            <TableRow>
              <TableCol>Space</TableCol>
              <TableCol>Owner</TableCol>
              <TableCol>Users</TableCol>
              <TableCol>Posts</TableCol>
              <TableCol>Actions</TableCol>
            </TableRow>
          </thead>
          <tbody>
            {spaces.map(space => {
              const postCount = posts.find(p => p._id === space._id);
              const owner = get(space, 'owner', {});
              return (
                <TableRow key={space._id}>
                  <TableCol>{space.name}</TableCol>
                  <TableCol>{owner.email}</TableCol>
                  <TableCol>
                    <Text>Total: {space.permissions.length}</Text>
                    {get(space, 'permissions', [])
                      .filter(p => p.role !== 'OWNER')
                      .map(p => (
                        <Text key={p.user._id}>{p.user.email}</Text>
                      ))}
                  </TableCol>
                  <TableCol>{postCount ? postCount.count : 0}</TableCol>
                  <TableCol>
                    <Text variant="link" onClick={() => impersonate(owner)}>
                      Impersonate as Owner
                    </Text>
                  </TableCol>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      )}
    </LoadingContainer>
  );
}

AdminSpaces.propTypes = {
  setLogin: PropTypes.func,
  refreshProfile: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  setLogin: (token, user) => dispatch(MainActions.setLogin(token, user)),
  refreshProfile: () => dispatch(MainActions.refreshProfile())
});

export default connect(
  null,
  mapDispatchToProps
)(AdminSpaces);
