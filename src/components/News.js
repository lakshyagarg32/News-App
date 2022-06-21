// rce
import React,{useEffect,useState} from 'react'
import Newsitem from './Newsitem'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';

  import PropTypes from 'prop-types'  
// impt


const News=(props)=>{
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // document.title=`${this.CapitlizeString(props.category)}-NewsMonkey`;
    
 
 const CapitlizeString=(word) =>
{
    return word.charAt(0).toUpperCase() + word.slice(1);
}
 
  // constructor(props){
  //   super(props);
   
    // this.state={
    //   articles: [],
    //   loading:false,
    //   page:1,
    //   totalResults:0
    // }
   
    // document.title=`${this.CapitlizeString(props.category)}-NewsMonkey`;
    
  // }
  
  const updatenews=async ()=>{
    props.setProgress(10);
    let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    //  this.setState({loading:true})
     setLoading(true)
    let data=await fetch(url);
    props.setProgress(30);
    let parseddata= await data.json();
    props.setProgress(70);
    setArticles(parseddata.articles)
    setTotalResults(parseddata.totalResults)
    setLoading(false)
    // this.setState({articles:parseddata.articles,
    //   totalresults:parseddata.totalResults,
    //    loading:false
      
    // })
    props.setProgress(100);

  }
  useEffect(() => {
    updatenews();
    
  }, [])
  
  // async componentDidMount(){
    // let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f835cc8cb90f41988257a2ec2882c469&page=1&pageSize=${props.pageSize}`;
    // this.setState({loading:true})
    // let data=await fetch(url);
    // let parseddata= await data.json();
    // this.setState({articles:parseddata.articles,totalresults:parseddata.totalResults,loading:false})
    // this.updatenews();
  // }
  const handlepreviousclick=async()=>{
  //   let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f835cc8cb90f41988257a2ec2882c469&page=${this.state.page-1}&pageSize=${props.pageSize}`;
  //   this.setState({loading:true})
  //   let data=await fetch(url);
  //   let parseddata= await data.json();
  //  // this.setState({articles:parseddata.articles})
  //   this.setState({
  //     page:this.state.page-1,
  //     articles:parseddata.articles,
  //     loading:false
      

  //   })
  // setState({page:this.state.page-1});
  setPage(page-1);
  updatenews();
    

  }
 const handlenextclick=async()=>{
  //   if(!(this.state.page+1 > Math.ceil(this.state.totalresults/props.pageSize))){
  //   let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f835cc8cb90f41988257a2ec2882c469&page=${this.state.page+1}&pageSize=${props.pageSize}`;
  //   this.setState({loading:true})
  //   let data=await fetch(url);
  //   let parseddata= await data.json();
   
  //  // this.setState({articles:parseddata.articles})
  //   this.setState({
  //     page:this.state.page+1,
  //     articles:parseddata.articles,
  //     loading:false}
      

  //   )
  // }
  // this.setState({page:this.state.page+1});
  setPage(page+1);
  updatenews();

  }
  const fetchMoreData = async() => {
    // this.setState({page:this.state.page+1});
    setPage(page+1);
    let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    // this.setState({loading:true})
    setPage(page+1);
    let data=await fetch(url);
    let parseddata= await data.json();
    setArticles(articles.concat(parseddata.articles));
    setTotalResults(parseddata.totalResults);
    // setLoading(false);
    // this.setState({
    //   articles:this.state.articles.concat(parseddata.articles),
    //   totalresults:parseddata.totalResults,
    //   loading:false
      
    // })
    
    
  };

  // render() {  
    return (
      < >
        <h1 className="text-center" style={{margin:'35px 0px' ,marginTop:'90px'}}>NewsMonkey- Top {CapitlizeString(props.category)} Headlines </h1>
        {loading && <Spinner></Spinner>}
          

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner></Spinner>}
        >
          <div className="container">x
          <div className="container">
          <div className="row">
          { articles.map((element)=>{
            return   <div className="col-md-4" key={element.url}>
            <Newsitem title={element.title?element.title:""} description={element.description?element.description:""} imageurl={element.urlToImage} newsurl={element.url} date={element.publishedAt} author={element.author} source={element.source.name}/>
            </div>
            


          }
          )}
          
          </div>
          </div>
           
         
          </div>
          </InfiniteScroll>
          {/* flex css 
          left arrow html code */}
         {/* <div className="container d-flex justify-content-between">
         <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlepreviousclick}> &larr; Previous </button> 
         <button disabled={this.state.page+1 > Math.ceil(this.state.totalresults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handlenextclick}>Next &rarr;</button>
         </div> */}
         
          
          </>

      
    )
  // }
}
News.defaultProps = {
  country: 'in',
  pageSize: 5,
  category:'general'
}
News.propTypes = {
  // pts
  country: PropTypes.string,
  // ptn
  pageSize: PropTypes.number,
  category:PropTypes.string,
}

export default News
