import {FetchSeriess} from './fetch-fred.js'
import fs from 'fs';
import path from 'path'
const tagList = ['GDP','GDPC1']
const seriesTags = FetchSeriess(tagList)



let json = JSON.stringify(seriesTags);
const testDataPath = path.join(process.cwd(),'Database')
fs.writeFile('seriess.json', json);