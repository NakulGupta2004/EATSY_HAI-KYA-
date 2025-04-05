import React from "react";

function BlogSidebar() {
  return (
    <div className="left ">
      <div className="sidebar dark_back dark_color ">
        <div className="search-box">
          <input
            type="text"
            className="dark_back"
            id="searchInput"
            placeholder="Search for a recipe..."
          />

          <i className="fa fa-search"></i>
        </div>
        <div className="categories-header dark_icon">
          <span className="cat">Categories</span>
          <img
            src="https://img.icons8.com/?size=100&id=39786&format=png&color=000000"
            alt=""
            
          />
        </div>
        <div className="categories">
          <ul className="categories-list">
            <li>
              Fruits & Vegetables <span>(15)</span>
            </li>
            <li>
              Bakery, Cake & Dairy <span>(12)</span>
            </li>
            <li>
              Beverages <span>(20)</span>
            </li>
            <li>
              Snacks & Branded Foods <span>(05)</span>
            </li>
            <li>
              Beauty & Household <span>(30)</span>
            </li>
            <li>
              Fruits & Vegetables <span>(15)</span>
            </li>
            <li>
              Bakery, Cake & Dairy <span>(12)</span>
            </li>
            <li>
              Beverages <span>(20)</span>
            </li>
            <li>
              Snacks & Branded Foods <span>(05)</span>
            </li>
            <li>
              Beauty & Household <span>(30)</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="categories-header dark_icon dark_color ">
        <span className="cat ">Recent Posts</span>
        <img
          src="https://img.icons8.com/?size=100&id=39786&format=png&color=000000"
          alt=""
          
        />
      </div>
      <div className="recent-post dark_color">
        <div className="recent-post-img">
          <img src="images/recent_1.png" alt=""  />
        </div>
        <div className="recent-post-cont dark_color">
          <p>John Wike</p>
          <span>20 Sep, 2024</span>
        </div>
      </div>
      <div className="recent-post dark_color">
        <div className="recent-post-img">
          <img src="images/recent2.png" alt=""  />
        </div>
        <div className="recent-post-cont dark_color ">
          <p>Megan Jones</p>
          <span>22 Nov, 2022</span>
        </div>
      </div>
      <div className="recent-post dark_color">
        <div className="recent-post-img">
          <img src="images/recent_3.png" alt=""  />
        </div>
        <div className="recent-post-cont ">
          <p>Mary Brown</p>
          <span>1 Dec, 2024</span>
        </div>
      </div>
      <div className="recent-post dark_color ">
        <div className="recent-post-img">
          <img src="images/recent_4.png" alt=""  />
        </div>
        <div className="recent-post-cont ">
          <p>Celiea Abbort</p>
          <span>1 Mar, 2024</span>
        </div>
      </div>
      <div className="categories-header dark_icon dark_color">
        <span className="cat">Tags</span>
        <img
          src="https://img.icons8.com/?size=100&id=39786&format=png&color=000000"
          alt=""
          
        />
      </div>

      <div className="tags  ">
        <div className="tags-1 dark_color">
          <div className="tags-icons  dark_icon dark_color">Vegetables</div>
          <div className="tags-icons dark_icon dark_color">Pharmacy</div>
          <div className="tags-icons dark_icon dark_color">Grocery</div>
        </div>
        <div className="tags-1">
          <div className="tags-icons dark_icon dark_color">Milk</div>
          <div className="tags-icons dark_icon dark_color">Fruit</div>
          <div className="tags-icons dark_icon dark_color">Organic</div>
        </div>
        <div className="tags-1">
          <div className="tags-icons dark_icon dark_color">Health</div>
          <div className="tags-icons dark_icon dark_color">Covid Care</div>
        </div>
      </div>
    </div>
  );
}

export default BlogSidebar;
