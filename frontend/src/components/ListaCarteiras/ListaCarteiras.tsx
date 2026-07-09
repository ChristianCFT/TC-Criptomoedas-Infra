import React from 'react';
import './listaCarteiras.css';
import CardCarteira from '../CardCarteira/CardCarteira';

function ListaCarteiras({ carteiras }) {
    return (
        <div className="area-carteiras-grid">
            {carteiras?.map((carteira) => (
                <CardCarteira 
                    key={carteira.id} 
                    id={carteira.id}
                    titulo={carteira.nome} 
                    saldo={carteira.saldoTotal} 
                />
            ))}
        </div>
    );
}

export default ListaCarteiras;