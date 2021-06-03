import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import '../../../index.css'
import { getUserProfile } from '../../../services/userService';
import { setUserProfile } from '../../../actions/userActions';

const Profile = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        let mounted = true;
        if(mounted) {
            getUserProfile(props.match.params.userId)
                .then(data => {
                        dispatch(setUserProfile(data))
                    });
            }
            return () => {
              mounted = false;
            }
    }, []);

    const profile = useSelector((state) => state.users.profile);
    console.log('PROFILE STATE', profile);

    return (
        <div id="all-components">
            <h1>PROFILE</h1>
        </div>
    )
}

export default withRouter(Profile);
