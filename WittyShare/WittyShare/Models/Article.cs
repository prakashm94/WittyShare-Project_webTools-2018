using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WittyShare.Models
{
    [BsonIgnoreExtraElements]
    public class Article
    {
        public Article(int articleId, Person creator, string title, string content, string patentStatus, IEnumerable<Comment> comments, IEnumerable<string> categories, int amazing, int good, int poor, IEnumerable<Person> favouritedBy, string image)
        {
            ArticleId = articleId;
            Creator = creator;
            Title = title;
            Content = content;
            PatentStatus = patentStatus;
            Comments = comments;
            Categories = categories;
            Amazing = amazing;
            Good = good;
            Poor = poor;
            FavouritedBy = favouritedBy;
            Image = image;
        }
        
        public int ArticleId { get; set; }
        public Person Creator { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string PatentStatus { get; set; }
        public IEnumerable<Comment> Comments { get; set; }
        public IEnumerable<string> Categories { get; set; }
        public int Amazing { get; set; }
        public int Good { get; set; }
        public int Poor { get; set; }
        public IEnumerable<Person> FavouritedBy { get; set; }
      public string Image { get; set; }
    }
}
