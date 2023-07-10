import { connect } from 'react-redux';
import MainActions, { MainSelectors } from 'redux/MainRedux';

const withLoading = WrappedComponent => {
  const mapStatesToProps = state => ({
    overlayLoading: MainSelectors.selectLoading(state)
  });

  const mapDispatchToProps = dispatch => ({
    setOverlayLoading: loading => dispatch(MainActions.setLoading(loading))
  });

  return connect(
    mapStatesToProps,
    mapDispatchToProps
  )(WrappedComponent);
};

export default withLoading;
