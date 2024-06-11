import { Event } from "../interfaces/events";
import { add, drop, get, getAll, getAllByUserId, getAllOwned, update } from "../models/events.model";
import { getIsAdminByUserId } from "../models/users.model";

export const getEvents =  async (req: any, res : any) => {
    try { 
        const results = await getAll();
        res.json({isSuccess: true, data: results});
    } catch (error:any) {
        res.status(500).json({ isSuccess: false, message: error.message });
    }
  }
export const getLoggedInUserEvents =  async (req: any, res : any) => {
    try { 
        const userId = req.query.user_id;
        if(userId === undefined) throw new Error("User_id query parameter is required");
        const getIsAdmin = await getIsAdminByUserId(userId);  
      if (getIsAdmin.length === 0) {
        res.status(404).json({ isSuccess: false, message: "User not found" });
      } else {
        const events =
        getIsAdmin[0].isadmin !== "1"
          ? getAllByUserId(userId)
          : getAll(); 
        const results = await events;
        res.json({ isSuccess: true, data: results });
      }
    } catch (error:any) {
        res.status(500).json({ isSuccess: false, message: error.message });
    }
  }
export const getEvent =  async (req: any, res : any) => {
    try { 
        const isAdmin = req.query.isadmin; 
        const event = isAdmin === "0" ?
         getAllOwned(req.query.user_id, req.params.id):
         get(req.params.id);
        const results = await event;
        res.json({isSuccess: true, data: results});
    } catch (error:any) {
      res.status(500).json({ isSuccess: false, message: error.message });
    }
  } 
export const addEvent =  async (req: any, res : any) => {
    try { 
        const newEvent : Event = req.body; 
        newEvent.createdby = req.body.user_id; 
        const events = await add(newEvent); 
        res.json({
          message: "Event created successfully",
          data: events,
          isSuccess: true
      });
    } catch (error:any) {
      res.status(500).json({ isSuccess: false, message: error.message });
    }
  } 
export const modifyEvent =  async (req: any, res : any) => {
    try { 
        const eventId : number = req.params.id;
        const event : Event = req.body;  
        event.createdby = req.body.user_id;  
        const results = await update(eventId, event);
        res.json({
          message: "Event updated successfully",
          data: results,
          isSuccess: true
      });
    } catch (error:any) {
      res.status(500).json({ isSuccess: false, message: error.message });
    }
  } 
export const deleteEvent =  async (req: any, res : any) => {
    try { 
        const eventId : number = req.params.id; 
        const results = await drop(eventId);
        res.json({
          message: "Event deleted successfully",
          data: results,
          isSuccess: true
      });
    } catch (error:any) {
      res.status(500).json({ isSuccess: false, message: error.message });
    }
  } 