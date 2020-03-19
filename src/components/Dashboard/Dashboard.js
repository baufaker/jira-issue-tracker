import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';

import './Dashboard.css';
import SearchByProject from '../Search/SearchByProject';
import SearchByUsers from '../Search/SearchByUsers';


//neste projeto apenas as issues estão gravadas no redux para efeitos de uso em mais de um componente (filtro por usuário, por exemplo)

const Dashboard = (props) => {
    const [findUsers, setFindUsers] = useState(false)

    const handleSwitchChange = () => {
        setFindUsers(!findUsers);
    }

    return(
        <div className="">
            <h1>Controle de Tarefas de Desenvolvimento</h1>
            <label>
                <Switch checked={findUsers} onChange={handleSwitchChange} color="primary"/>
                { findUsers ? "Busca por responsável" : "Busca por projetos" }
            </label>
            {findUsers ? <SearchByUsers/> : <SearchByProject />}
        </div>
    )
}

export default Dashboard;
