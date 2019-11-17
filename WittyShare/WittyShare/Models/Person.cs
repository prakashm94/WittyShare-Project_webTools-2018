using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Drawing;
using MongoDB.Bson.Serialization.Attributes;

namespace WittyShare.Models
{
    [BsonIgnoreExtraElements]
    public class Person
    {
        public Person(int personId, string fullname, string gender, string contact, string email, string password, string profession, int experience, string degree, string degreeMajor, IEnumerable<string> skills, DateTime dob, string pic)
        {
            PersonId = personId;
            Fullname = fullname;
            Gender = gender;
            Contact = contact;
            Email = email;
            Password = password;
            Profession = profession;
            Experience = experience;
            Degree = degree;
            DegreeMajor = degreeMajor;
            Skills = skills;
            Dob = dob;
            Pic = pic;
        }

        public int PersonId { get; set; }
        public string Fullname { get; set; }
        public string Gender { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Profession { get; set; }
        public double Experience { get; set; }
        public string Degree { get; set; }
        public string DegreeMajor { get; set; }
        public IEnumerable<string> Skills { get; set; }
        public DateTime Dob { get; set; }
       public string Pic { get; set; }

    }
}
