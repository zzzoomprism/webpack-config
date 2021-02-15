import * as $ from 'jquery';
import Post from '@models/Post';
import './styles/styles.css';
import json from '@assets/data.json';
import joelImage from '@assets/joel.jpg';
import csv from '../assets/data.csv';
import xml from '../assets/data.xml';
import './styles/styleS.scss';
import React from "react";
import App from 'index';
import { render } from "react-dom";
const post = new Post( json.title, joelImage, xml, csv );

post.insertImage();
post.xmlData();
post.csvData();

$( 'jjj' ).html( 'jqueryyyy' )

const getData = async () =>
{
    await new Promise( ( resolve, reject ) => console.log( 'console.log resolve', resolve ) );
}

getData();

class Util
{
    static id = Date.now()
}

render( <App />, document.getElementById( 'root' ) );