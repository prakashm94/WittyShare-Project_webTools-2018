using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WittyShare.Models
{
    public class CommentManager
    {
        List<Comment> _comments = new List<Comment>();
        string connectionString = "mongodb://127.0.0.1:27017";
        string myConnectionString = "server=127.0.0.1;uid=root;" + "pwd=Poojith@420;database=wittyshare;";
        public CommentManager()
        {
            try
            {
                List<Comment> CommentList = new List<Comment>();
                MongoClient client = new MongoClient(connectionString);
                MongoServer server = client.GetServer();
                MongoDatabase Comment = server.GetDatabase("Comment");

                MongoCollection<Comment> articles =
                    Comment.GetCollection<Comment>("Comment");
                foreach (Comment p in articles.FindAll())
                {
                    CommentList.Add(p);
                }

                _comments = CommentList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public IEnumerable<Comment> GetAll { get { return _comments; } }
        //public IEnumerable<Comment> GetCommentById(int id)
        //{
        //    return _comments.Where(_ => _.CommentId.Equals(id)).ToList();
        //}
        public void AddComment(Comment p)
        {
            try
            {
                List<Event> eventList = new List<Event>();
                MongoClient client = new MongoClient(connectionString);
                MongoServer server = client.GetServer();
                MongoDatabase comment = server.GetDatabase("Comment");
                MongoCollection<BsonDocument> commentData =
                    comment.GetCollection<BsonDocument>("Comment");
                BsonDocument evtBson = new BsonDocument { p.ToBsonDocument() };
                commentData.Insert(evtBson);
                _comments.Add(p);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception" + ex);
            }
        }

    }
}
