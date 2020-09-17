import React from 'react';
import './Table.css';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';

function Table({ countries }) {
    const {t} = useTranslation ('app');

    return (
        <div className="table">
        <table>
            <tbody>
            {countries.map(({ country, cases })=>(
                <tr key={country}>
                    <td>{t(`app.countries.${country.replace(".", "")}`)}</td>
                    <td><strong>{numeral(cases).format("0,0")}</strong></td>
                </tr>
            ))}
            </tbody>
            </table>
        </div>
    )
}

export default Table
