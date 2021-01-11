import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import Master from '../master'
import BasicExample from '../basic'

import './index.scss'

const Root = (props): React.ReactElement => {
    const {
        match: { url }
    } = props

    return (
        <div className="root-container">
            <h1>Example of TitleWithEditor</h1>
            <Switch>
                <Route path="/home" component={Master} />
                <Route path="/basic" component={BasicExample} />
                <Route path={url} exact render={(): React.ReactNode => <Redirect to="/home" />} />
            </Switch>
        </div>
    )
}

Root.propTypes = {
    match: PropTypes.object.isRequired
}

export default withRouter(Root)
