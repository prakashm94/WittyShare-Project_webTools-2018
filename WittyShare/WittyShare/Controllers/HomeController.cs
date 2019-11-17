using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WittyShare;
using WittyShare.Models;

namespace WittyShare.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
        PersonManager pm = new PersonManager();
        ArticleManager am = new ArticleManager();
        EventManager em = new EventManager();
       // CommentManager cm = new CommentManager();

        // GET: api/<controller>
        [HttpGet]
        [Route("api/[controller]")]
        public IEnumerable<Person> Get()
        {
            // return new string[] { "value1", "value2" };
           // Person p = new Person(17, "abd", "Male", "1234", "p@pshetty.com", "password", "Professsor", 3, "MS", "IS", new List<string> { "c", "c++" }, DateTime.Now);
            //   pm.AddPerson(p);
           // Comment c = new Comment(17, p, 5, 4, true);
            // cm.AddComment(c);
   //         Article a = new Article(17, p, "Article16", "Content of Article16", "No Patent", new List<Comment> { c }, new List<string> { "Physics", "Computer" }, 59, 25, 11, new List<Person> { p });
            // am.AddArticle(a);
            //Event e = new Event(17, a, "Event 16 Name", DateTime.Now.AddDays(2), 23.09, 25.06, new List<Person> { p });
            // em.AddEvent(e);
            return pm.GetAll;
        }
        [HttpGet("persons/{email}")]
        [Route("api/[controller]/persons/{email}")]
        public IEnumerable<Person> GetPersonEmailList(string email)
        {
            return pm.GetPersonByEmail(email);
        }
        [HttpGet("events/{email}")]
        [Route("api/[controller]/events/{email}")]
        public IEnumerable<Event> GetEventByEmailList(string email)
        {
            return em.GetEventByEmail(email);
        }
        [HttpGet("articles/{email}")]
        [Route("api/[controller]/articles/{email}")]
        public IEnumerable<Article> GetArticleByEmailList(string email)
        {
            return am.GetArticleByEmail(email);
        }

        [HttpGet("events/{email}/{category}")]
        [Route("api/[controller]/events/{email}/{category}")]
        public IEnumerable<Event> GetEventByEmailCategoryList(string email, string category)
        {
            return em.GetEventByEmail(email,category);
        }
        [HttpGet("articles/{email}/{category}")]
        [Route("api/[controller]/articles/{email}/{category}")]
        public IEnumerable<Article> GetArticleByEmailCategoryList(string email, string category)
        {
            return am.GetArticleByEmail(email,category);
        }

        // GET api/<controller>/5
        [HttpGet("{username}/{pass}")]
        [Route("api/[controller]/{username}/{pass}")]
        public IEnumerable<Article> GetLogin(string username, string pass)
        {
            if (pm.Validate(username, pass))
            {
                var articleList = am.GetAll;
                return articleList;
            }
            return null;
        }
        [HttpGet("ArticleCategory/{username}/{category}")]
        [Route("api/[controller]/ArticleCategory/{username}/{category}")]
        public IEnumerable<Article> GetArticleByCategoryList(string username,string category)
        {
            var articleList = am.GetArticleByCategory(category);

            return articleList;
        }

        [HttpGet("EventCategory/{username}/{category}")]
        [Route("api/[controller]/EventCategory/{username}/{category}")]
        public IEnumerable<Event> GetEventByCategoryList(string username, string category)
        {
            var eventList = em.GetEventByCategory(category);
            return eventList;
        }


        [HttpGet("persons")]
        [Route("api/[controller]/persons")]
        public IEnumerable<Person> GetPersonList()
        {
            return pm.GetAll;
        }

       
        [HttpGet("articles")]
        [Route("api/[controller]/articles")]
        public IEnumerable<Article> GetArticleList()
        {
            return am.GetAll;
        }
        [HttpGet("events")]
        [Route("api/[controller]/events")]
        public IEnumerable<Event> GetEventList()
        {
            return em.GetAll;
        }

        [HttpGet("{username}/ArticleCategory/{category}")]
        [Route("api/[controller]/{username}/ArticleCategory/{category}")]
        public IEnumerable<Article> GetArticleByCategory(string username, string category)
        {
            var articleList = am.GetArticleByCategory(category);

            return articleList;
        }

        [HttpGet("{username}/{text}/{id}")]
        [Route("api/[controller]/{username}/{text}/{id}")]
        public async Task<IEnumerable<Object>> GetByTextId(string text, int id)
        {
            //if (text == "Comment")
            //{
            //    return await GetAsyncComment(id);
            //}
             if (text == "Article")
            {
                return await GetAsyncArticle(id);
            }
            else if (text == "Event")
            {
                return await GetAsyncEvent(id);
            }
            else if (text == "Person")
            {
                return await GetAsyncPerson(id);
            }
            else
            {
                return await GetAsyncPerson(-1);
            }

        }

        private Task<IEnumerable<Person>> GetAsyncPerson(int id)
        {
            return Task.FromResult(pm.GetPersonById(id));
        }
        private Task<IEnumerable<Article>> GetAsyncArticle(int id)
        {
            return Task.FromResult(am.GetArticleById(id));
        }
        private Task<IEnumerable<Event>> GetAsyncEvent(int id)
        {
            return Task.FromResult(em.GetEventById(id));
        }
        //private Task<IEnumerable<Comment>> GetAsyncComment(int id)
        //{
        //    return Task.FromResult(cm.GetCommentById(id));
        //}

        [HttpPost]
        [Route("api/[controller]/[action]")]
        [ActionName("PostArticle")]
        public async Task<StatusCodeResult> PostArticle([FromBody]Article p)
        {
            if (await PostAsyncArticleCheck(p))
            {
                return await PostAsyncPartTwoArticle(p);
            }
            else
            {
                am.AddArticle(p);
                return new StatusCodeResult(201); //created
            }
        }
        private Task<bool> PostAsyncArticleCheck(Article s)
        {
            //  return Task.FromResult(am.GetAll.Any(o => o.Equals(s)));
            return Task.FromResult(am.GetAll.Any(o => o.ArticleId == (s.ArticleId)));
        }
        private Task<StatusCodeResult> PostAsyncPartTwoArticle(Article s)
        {
            if (am.EditArticle(s))
            {
                return Task.FromResult(new StatusCodeResult(200)); //success
            }
            else
            {
                return Task.FromResult(new StatusCodeResult(404)); //not found
            }
        }


        // POST api/<controller>
        [HttpPost]
        [Route("api/[controller]/[action]")]
        [ActionName("PostPerson")]
        public async Task<StatusCodeResult> PostPerson([FromBody]Person p)
        {
            if (await PostAsyncPersonCheck(p))
            {
                return await PostAsyncPartTwo(p);
                //return new StatusCodeResult(404); ;
            }
            else
            {
                pm.AddPerson(p);
                return new StatusCodeResult(201); //created
            }
        }
        private Task<bool> PostAsyncPersonCheck(Person s)
        {
           // return Task.FromResult(pm.GetAll.Any(o => o.Equals(s)));
            return Task.FromResult(pm.GetAll.Any(o => o.PersonId == (s.PersonId)));
        }
        private Task<StatusCodeResult> PostAsyncPartTwo(Person s)
        {
            if (pm.EditPerson(s))
            {
                return Task.FromResult(new StatusCodeResult(200)); //success
            }
            else
            {
                return Task.FromResult(new StatusCodeResult(404)); //not found
            }
        }

    


        [HttpPost]
        [Route("api/[controller]/[action]")]
        [ActionName("PostEvent")]
        public async Task<StatusCodeResult> PostEvent([FromBody]Event p)
        {
            if (await PostAsyncEventCheck(p))
            {
                 return await PostAsyncPartTwoEvent(p);
            }
            else
            {
                em.AddEvent(p);
                return new StatusCodeResult(201); //created
            }
        }
        private Task<bool> PostAsyncEventCheck(Event s)
        {
            return Task.FromResult(em.GetAll.Any(o => o.EventId== (s.EventId)));
        }
        private Task<StatusCodeResult> PostAsyncPartTwoEvent(Event s)
        {
            if (em.EditEvent(s))
            {
                return Task.FromResult(new StatusCodeResult(200)); //success
            }
            else
            {
                return Task.FromResult(new StatusCodeResult(404)); //not found
            }
        }


        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Article value)
        {

        }

        // DELETE api/<controller>/5
        //Check this routing link whether u get the id or not if delete is not working

        [HttpDelete("{id}")]
        [Route("api/[controller]/[action]")]
        [ActionName("DeletePerson")]
        public void DeletePerson(int id)
        {
        }

    }
}
