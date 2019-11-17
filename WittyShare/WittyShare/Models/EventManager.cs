using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WittyShare.Models
{
    public class EventManager
    {
        string connectionString = "mongodb://127.0.0.1:27017";
        List<Event> _events = new List<Event>();
        public EventManager()
        {
            try
            {
                List<Event> EventList = new List<Event>();
                MongoClient client = new MongoClient(connectionString);
                MongoServer server = client.GetServer();
                MongoDatabase Event = server.GetDatabase("Event");

                MongoCollection<Event> evts =
                    Event.GetCollection<Event>("Event");
                foreach (Event p in evts.FindAll())
                {
                    EventList.Add(p);
                }

                _events = EventList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public IEnumerable<Event> GetAll { get { return _events; } }
        public IEnumerable<Event> GetEventById(int id)
        {
            try
            {
                return _events.Where(_ => _.EventId.Equals(id)).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return null;
        }

        public IEnumerable<Event> GetEventByEmail(string email)
        {
            try
            {
                return _events.Where(_ => _.EventArticle.Creator.Email.Equals(email)).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return null;
        }

        public IEnumerable<Event> GetEventByEmail(string email, string category)
        {
            try
            {
                return _events.Where(_ => _.EventArticle.Creator.Email.Equals(email) && _.EventArticle.Categories.Contains(category)).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return null;
        }

        public IEnumerable<Event> GetEventByCategory(string category)
        {
            try
            {
                return _events.Where(_ => _.EventArticle.Categories.Contains(category)).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return null;
        }
        public void AddEvent(Event p)
        {
            try
            {
                List<Event> eventList = new List<Event>();
                MongoClient client = new MongoClient(connectionString);
                MongoServer server = client.GetServer();
                MongoDatabase evt = server.GetDatabase("Event");
                MongoCollection<BsonDocument> evtData =
                    evt.GetCollection<BsonDocument>("Event");
                BsonDocument evtBson = new BsonDocument { p.ToBsonDocument() };
                evtData.Insert(evtBson);
                _events.Add(p);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception" + ex);
            }
        }

        public void DeleteEvent(int id)
        {
            try
            {
                var conString = "mongodb://localhost:27017";
                var Client = new MongoClient(conString);
                var DB = Client.GetDatabase("Event");
                var collection = DB.GetCollection<BsonDocument>("Event");

                //deleting single record
                var Deleteone = collection.DeleteOneAsync(
                                Builders<BsonDocument>.Filter.Eq("EventId", id));

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            //deleting multiple record
            //var DelMultiple =  collection.DeleteManyAsync(
            //                 Builders<BsonDocument>.Filter.Lt("EventId", 1000));

            //retrieve's data
            //collection.Find(new BsonDocument())
            //.ForEachAsync(x => Console.WriteLine(x));
        }

        public bool EditEvent(Event s)
        {
            try
            {
                var _s = _events.FirstOrDefault(o => o.EventId == (s.EventId));
                if (_s == null)
                    return false;
                _s.EventArticle = s.EventArticle;
                _s.EventDate = s.EventDate;
                _s.EventName = s.EventName;
                _s.Address = s.Address;
                _s.PeopleAttending = s.PeopleAttending;
                DeleteEvent(_s.EventId);
                AddEvent(_s);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return false;
        }

    }
}
