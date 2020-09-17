import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react';
import { useTranslation } from 'react-i18next';
import './InfoBox.css'

function InfoBox({title, cases, active, color, total, onClick}) {
    
  const { t } = useTranslation ('app');
    return (
        <Card onClick={onClick} className={`infoBox ${active && 'infoBox--selected'}`}
        style={{'borderColor': color}}>
            <CardContent>
                <Typography className="infoBox__title"  color="textSecondary">
                    {title}
                </Typography>
                <h2 className="infoBox__cases" style={{'color': color}}>{cases}</h2>
                <Typography className="infoBox__total" color="textSecondary">
                    {total} {t('app.infobox.Total')}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
