import { FunctionComponent } from "react";

interface DefaultMarketProps {

}

const DefaultMarket: FunctionComponent<DefaultMarketProps> = () => {
    return (< >


        {/* one */}
        <div className="movie market-item">
            <div className="comming-soon">
                <h1>Market</h1>
                <h2>* Comming soon *</h2>
            </div>
            <img src="https://cdn.abcotvs.com/dip/images/1710143_011917-ktrk-shutterstock-popcorn-img.jpg" alt="Popcorn XL" />
            <div className="movie-info">
                <button disabled={true} title="Comming soon" className="btn btn-outline-warning">Buy now</button>
                <h4>XL Popcorn</h4>
                <p><strong>Price:</strong> 30 <i className="fa-solid fa-coins"></i></p>
                <h3 className="text-warning">* Comming soon *</h3>
            </div>
        </div>

        {/* two */}
        <div className="movie">
            <div className="comming-soon">
                <h1>Market</h1>
                <h2>* Comming soon *</h2>
            </div>
            <img src="https://media.sketchfab.com/models/739be653e83546fcaa98d2fdf3793f94/thumbnails/f743be048827462090cc6ea0f854bbc8/b2eb5fdd47ba40b2a0729a5eb281442a.jpeg" alt="CocaCola M" />
            <div className="movie-info">
                <button disabled={true} title="Comming soon" className="btn btn-outline-warning">Buy now</button>
                <h4>M CocaCola</h4>
                <p><strong>Price:</strong> 25 <i className="fa-solid fa-coins"></i></p>
                <h3 className="text-warning">* Comming soon *</h3>
            </div>
        </div>
    </>);
}

export default DefaultMarket;