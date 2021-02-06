import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import { List as UserList, Create as UserCreate } from '../components/user/'
import jwt from 'jsonwebtoken'

import { Route } from "react-router-dom";
import { getToken } from '../config/auth';

const User = (props) => {
    const [useinfo, setuseinfo] = useState({})
    useEffect(() => {
        (async () => {
            const { user } = await jwt.decode(getToken())
            setuseinfo(user)
        })()
        return () => { }
    }, [])

    return (
        <Layout info={useinfo}>
            <Route exact match path={props.match.path} component={UserList} />
            <Route exact path={props.match.path + "create"} component={UserCreate} />
            <Route exact path={props.match.path + "edit/:id"} component={UserCreate} />
        </Layout>
    )
}

export default User
