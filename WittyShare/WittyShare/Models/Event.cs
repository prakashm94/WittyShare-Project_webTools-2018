using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WittyShare.Models
{
    [BsonIgnoreExtraElements]
    public class Event
    {
        public Event(int eventId, Article eventArticle, string eventName, string eventDate, string address, IEnumerable<Person> peopleAttending)
        {
            EventId = eventId;
            EventArticle = eventArticle;
            EventName = eventName;
            EventDate = eventDate;
            Address = address;
            PeopleAttending = peopleAttending;
        }

        public int EventId { get; set; }
        public Article EventArticle { get; set; }
        public string EventName { get; set; }
        public string EventDate { get; set; }
        public string Address { get; set; }
        public IEnumerable<Person> PeopleAttending { get; set; }
    }
}
