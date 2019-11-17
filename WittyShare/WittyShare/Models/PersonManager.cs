using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

using MongoDB.Driver.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
namespace WittyShare.Models
{
    public class PersonManager
    {
        List<Person> _persons = new List<Person>();
        //string myConnectionString="server=127.0.0.1;uid=root;" +"pwd=Poojith@420;database=wittyshare;";
        string connectionString = "mongodb://127.0.0.1:27017";
        public PersonManager()
        {
            //MongoClient client = null;
            //MongoServer server = null;
            //MongoDatabase database = null; 
            //try
            //{
            //    client = new MongoClient(connectionString);

            //    Console.WriteLine("Client Created Successfuly........");
            //    Console.WriteLine("Client: " + client.ToString());
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine("Filed to Create Client.......");
            //    Console.WriteLine(ex.Message);
            //}


            //try
            //{
            //    Console.WriteLine("Getting Servicer object......");
            //    server = client.GetServer();

            //    Console.WriteLine("Server object created Successfully....");
            //    Console.WriteLine("Server :" + server.ToString());
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine("Filed to getting Server Details");
            //    Console.WriteLine(ex.Message);
            //}
            //try
            //{
            //    Console.WriteLine("Getting reference of database.......");
            //    database = server.GetDatabase("Person");
            //    Console.WriteLine("Database Name : " + database.Name);
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine("Failed to Get reference of Database");
            //    Console.WriteLine("Error :" + ex.Message);
            //}

            List<Person> personList = new List<Person>();
            MongoClient client = new MongoClient(connectionString);
            MongoServer server = client.GetServer();
            MongoDatabase person = server.GetDatabase("Person");

            MongoCollection<Person> persons =
                person.GetCollection<Person>("Person");
            foreach (Person p in persons.FindAll())
            {
                personList.Add(p);
            }

            _persons = personList;

            //try
            //{
            //    conn = new MySql.Data.MySqlClient.MySqlConnection(myConnectionString);
            //    conn.Open();
            //    Console.WriteLine("Connection successfull");
            //    Console.WriteLine("Connecting");
            //    MySqlCommand cmd = new MySqlCommand();
            //    MySqlDataReader reader;

            //    cmd.CommandText = "SELECT * FROM person";
            //    cmd.CommandType = System.Data.CommandType.Text;
            //    cmd.Connection = conn;

            //    //sqlConnection1.Open();

            //    reader = cmd.ExecuteReader();
            //    // Data is accessible through the DataReader object here.
            //    if (reader.HasRows)
            //    {
            //        // Read advances to the next row.
            //        while (reader.Read())
            //        {

            //            int personId = Int32.Parse(reader.GetString(reader.GetOrdinal("personId")));
            //            string fullname = reader.GetString(reader.GetOrdinal("FullName"));
            //            string gender = reader.GetString(reader.GetOrdinal("Gender"));
            //            string contact = reader.GetString(reader.GetOrdinal("Contact"));
            //            string email = reader.GetString(reader.GetOrdinal("Email"));
            //            string password = reader.GetString(reader.GetOrdinal("Password"));
            //            string profession = reader.GetString(reader.GetOrdinal("Profession"));
            //            int experience = Int32.Parse(reader.GetString(reader.GetOrdinal("experience")));
            //            string degree = reader.GetString(reader.GetOrdinal("Degree"));
            //            string degreeMajor = reader.GetString(reader.GetOrdinal("DegreeMajor"));
            //            string skills = reader.GetString(reader.GetOrdinal("Skills"));
            //            var skillList = skills.Split(',');
            //            DateTime dob = DateTime.Parse(reader.GetString(reader.GetOrdinal("Dob")));
            //            Person per = new Person( personId,  fullname,  gender,  contact,  email,  password,  profession,  experience,  degree,  degreeMajor, skillList,  dob);
            //            _persons.Add(per);
            //            Console.WriteLine("temp val" + personId);
            //        }
            //    }
            //    conn.Close();
            //}
            //catch (MySql.Data.MySqlClient.MySqlException ex)
            //{
            //    Console.WriteLine(ex.Message);
            //}
        }

        public IEnumerable<Person> GetAll { get { return _persons; } }
        public IEnumerable<Person> GetPersonById(int id)
        {
            try
            {
                return _persons.Where(_ => _.PersonId.Equals(id)).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return null;
        }
        public IEnumerable<Person> GetPersonByEmail(string email)
        {
            try
            {
                return _persons.Where(_ => _.Email.Equals(email)).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return null;
        }
        public Boolean Validate(string email, string password)
        {

            bool has = _persons.Any(per => per.Email == email && per.Password == password);
            return has;

        }

        public void AddPerson(Person p)
        {
            try
            {
                List<Person> personList = new List<Person>();
                MongoClient client = new MongoClient(connectionString);
                MongoServer server = client.GetServer();
                MongoDatabase person = server.GetDatabase("Person");
                MongoCollection<BsonDocument> personData =
                    person.GetCollection<BsonDocument>("Person");
                BsonDocument personBson = new BsonDocument { p.ToBsonDocument() };
                personData.Insert(personBson);
                _persons.Add(p);

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception" + ex);
            }
        }
        public void DeletePerson(int id)
        {
            try
            {
                var conString = "mongodb://localhost:27017";
                var Client = new MongoClient(conString);
                var DB = Client.GetDatabase("Person");
                var collection = DB.GetCollection<BsonDocument>("Person");

                //deleting single record
                var Deleteone = collection.DeleteOneAsync(
                                Builders<BsonDocument>.Filter.Eq("PersonId", id));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public bool EditPerson(Person s)
        {
            try
            {
                var _s = _persons.FirstOrDefault(o => o.PersonId.Equals(s.PersonId));
                if (_s == null)
                    return false;
                _s.Profession = s.Profession;
                _s.Contact = s.Contact;
                _s.Degree = s.Degree;
                _s.Email = s.Email;
                _s.DegreeMajor = s.DegreeMajor;
                _s.Dob = s.Dob;
                _s.Experience = s.Experience;
                _s.Fullname = s.Fullname;
                _s.Gender = s.Gender;
                _s.Skills = s.Skills;
                _s.Password = s.Password;
                DeletePerson(_s.PersonId);
                AddPerson(_s);
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
