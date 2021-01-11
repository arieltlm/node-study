import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import Lists from '../lists'

import './index.scss'

const Root = (props): React.ReactElement => {
    const {
        match: { url }
    } = props

    return (
        <div className="root-container">
            <h1>Example of CRUD</h1>
            <Switch>
                <Route path="/home" component={Lists} />
                <Route path={url} exact render={(): React.ReactNode => <Redirect to="/home" />} />
            </Switch>
        </div>
    )
}

Root.propTypes = {
    match: PropTypes.object.isRequired
}

export default withRouter(Root)
