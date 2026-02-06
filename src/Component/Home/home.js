import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import "./home.css"

const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};


function Home() {
    return (
        <>
            <div className="container border-box px-4 py-3">
                <div className="d-flex justify-between items-center">
                    <div className="bg-white d-flex items-center py-3 px-2 gap-x-2 rounded-lg font-20 homeSearch">
                        <FaSearch></FaSearch>
                        <input type="text" name="homeSearch" className="border-none outline-none font-bold col-11 px-0 py-0" placeholder="Search something here..." ></input>
                    </div>
                    <div className="font-20">
                        <FaFilter />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;