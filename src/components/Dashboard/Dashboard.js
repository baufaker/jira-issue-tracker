import React, { useState } from 'react';

import './Dashboard.css';
import SearchByProject from '../Search/SearchByProject';

//neste projeto apenas as issues estão gravadas no redux para efeitos de uso em mais de um componente (filtro por usuário, por exemplo)

const Dashboard = (props) => {

    return(
        <div className="">
            <h1>Controle de Atividade de Desenvolvimento</h1>
            <SearchByProject/>
        </div>
    )
}

export default Dashboard;
