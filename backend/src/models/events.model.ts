import postgres from "postgres";

import sql from "../helpers/dbconnection";
import { Event } from "../interfaces/events"; 


export const getAll = async () : Promise<postgres.RowList<postgres.Row[]>> => {
    try {
    const events = sql`SELECT * FROM events`;
    return await events;
    }catch(error) {
        throw error;
    }
}

export const getAllByUserId = async (userId: number) : Promise<postgres.RowList<postgres.Row[]>> => {
    try {
        const events = sql`SELECT * FROM events WHERE createdby = ${userId}`
        return await events;
    }catch(error) {
        throw error;
    }
}
     
export const getAllOwned = async (userId: number, eventId: number) : Promise<postgres.RowList<postgres.Row[]>> => {
    try {
        const events = sql`SELECT * FROM events WHERE  createdby= ${userId} and id = ${eventId}`
        return await events;
    }catch(error) {
        throw error;
    }     
}
export const get = async (eventId: number) : Promise<postgres.RowList<postgres.Row[]>> => {
    try {
        const event = sql`SELECT * FROM events WHERE id = ${eventId}`
        return await event;
    }catch(error) {
        throw error;
    }     
}
export const add = async (event: Event) : Promise<postgres.RowList<postgres.Row[]>> => {
    try {   
        const results = sql`INSERT INTO events ${sql(event, 'name', 'attendants', 'description', 'createdby', 'datetime')}`;  
        return await results; 
    }catch(error) {
        throw error;
    }     
}
export const update = async (eventId: number, event: Event) : Promise<postgres.RowList<postgres.Row[]>> => {
    try {   
        const results = sql`update events set ${sql(event, 'name', 'attendants', 'description', 'createdby', 'datetime')} where id = ${eventId}`;
        return await results; 
    }catch(error) {
        throw error;
    }     
}
export const drop = async (eventId: number) : Promise<postgres.RowList<postgres.Row[]>> => {
    try {   
        const results = sql`delete from events where id = ${eventId}`;
        return await results;
    }catch(error) {
        throw error;
    }     
}