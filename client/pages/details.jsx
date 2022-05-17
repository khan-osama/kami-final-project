import React from 'react';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animeImg: '',
      animeInfo: '',
      relatedAnime: []
    };
    this.getAnimeDetails = this.getAnimeDetails.bind(this);
  }

  render() {
    const { relatedAnime } = this.state;
    const { animeId } = this.props;
    if (!this.state.animeInfo || !this.state.relatedAnime) return null;
    return (
      <div key={animeId} className='details-container'>
        <div className='hero-img-row'>
          <div className='container details-section'>
            <div className="row">
              <div className='col-sm schedule-anime'>
                <img className='details-anime-img' src={`${this.state.animeImg}`}></img>
                <button className='save-button'>Save Anime</button>
              </div>
              <div className='col-sm anime-data'>
                <h4>{this.state.animeInfo.title}</h4>
                <p>{`${this.state.animeInfo.synopsis}`}</p>
              </div>
            </div>
            <div className="row">
            </div>
          </div>
          <div className='background-container'>
              <div className='container info-section'>
                <div className='row'>
                  <div className='col-sm airing-info'>
                    <div className='anime-airing'>
                      <p className='br-info'>Episodes<br></br><span>{this.state.animeInfo.episodes !== null ? this.state.animeInfo.episodes : 'N/A'}</span></p>
                      <p className='br-info'>Status<br></br><span>{this.state.animeInfo.status}</span></p>
                      <p className='br-info'>Type<br></br><span>{this.state.animeInfo.type}</span></p>
                      <p className='br-info'>Rating<br></br><span>{this.state.animeInfo.score !== null ? this.state.animeInfo.score : 'N/A'}</span></p>
                      <p className='br-info'>Air Dates<br></br><span>{this.state.animeInfo.aired.string}</span></p>
                    </div>
                  </div>
                  <div className='col-sm'>
                    <div className='row related-row'>
                      <h5>Related Shows</h5>
                      {relatedAnime.filter(anime => anime.relation === 'Sequel' || anime.relation === 'Prequel').map((obj, index) => {
                        return (
                          <div key={obj.relation} className='col-sm related-elements'>
                            <img className='related-anime-img' src={`${this.state.animeImg}`}></img>
                            <div className='related-info'>
                              <p className='relation'>{obj.relation}</p>
                              <a href={'#details?animeId=' + obj.entry[0].mal_id} onClick={this.getAnimeDetails}>{obj.entry[0].name}</a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className='row'>

                    </div>
                    <div className='row'>

                    </div>
                    <div className='row'>

                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getAnimeDetails();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.animeId !== this.props.animeId) {
      this.getAnimeDetails();
    }
  }

  getAnimeDetails() {
    const { animeId } = this.props;
    fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
      .then(data => {
        return data.json();
      })
      .then(anime => this.setState({
        animeInfo: anime.data,
        animeImg: anime.data.images.jpg.image_url
      }));
    fetch(`https://api.jikan.moe/v4/anime/${animeId}/relations`)
      .then(data => {
        return data.json();
      })
      .then(anime => {
        this.setState({
          relatedAnime: anime.data
        });
      });
  }
}
