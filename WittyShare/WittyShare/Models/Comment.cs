using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WittyShare.Models
{
    [BsonIgnoreExtraElements]
    public class Comment
    {
        public Comment(string commentData, Person commentedBy, int upVote, int downVote, bool verified)
        {
            CommentData = commentData;
            CommentedBy = commentedBy;
            UpVote = upVote;
            DownVote = downVote;
            Verified = verified;
        }

        public string CommentData { get; set; }
        public Person CommentedBy { get; set; }
        public int UpVote { get; set; }
        public int DownVote { get; set; }
        public Boolean Verified { get; set; }

    }
}
