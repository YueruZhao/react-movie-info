import React from 'react'

function Footer() {
    return (
        <div>
            <div class="row">
                <div class="col-md-12">
                    <div class="footer p-3 mt-4 text-center bg-dark text-light">
                        Developed By:
                        &nbsp;
                        

                        <a href="https://www.linkedin.com/in/yueru-zhao-93934aa3/" class='text-warning font-weight-normal'
                        target='_blank'
                        >
                            Yueru Zhao
                        </a>
                        , Using <i class="fab fa-react" /> React JS &amp; Redux JS integrated with external movies data API
                        <a href="http://www.omdbapi.com/"
                        target='_blank'
                        >
                            &nbsp; OMDB
                        </a>
                       
                        &nbsp; And
                        <a href="https://www.themoviedb.org/documentation/api"
                        target='_blank'
                        >
                            &nbsp; TMDB
                        </a>
                        
                    </div>
            </div>
            </div>
        </div>
    )
}

export default Footer
