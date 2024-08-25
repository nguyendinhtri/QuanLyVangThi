import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/DsVangthi'
import Ttsinhvien from '../pages/Thongtinsinhvien'
import Donvangthis from '../pages/Donvangthis'
import Lichthitonghop from '../pages/Lichthitonghop'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/ttsinhvien' component={Ttsinhvien}/>
            <Route path='/lichthitonghop' component={Lichthitonghop}/>
            <Route path='/donvangthi/:userId' component={Donvangthis}/>
        </Switch>
    )
}

export default Routes