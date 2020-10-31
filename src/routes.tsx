import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CreateOrphanage from './screens/CreateOrphanage'
import Landing from './screens/Landing'
import Orphanage from './screens/Orphanage'
import OrphanagesMap from './screens/OrphanagesMap'

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/app" component={OrphanagesMap} />
      <Route path="/orphanages/create" component={CreateOrphanage} />
      <Route path="/orphanages/:id" component={Orphanage} />
    </Switch>
  </BrowserRouter>
)

export default Routes
