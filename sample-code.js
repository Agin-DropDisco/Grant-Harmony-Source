import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Img from 'react-cool-img'
import Modal from 'react-modal'
import ReactCanvasConfetti from 'react-canvas-confetti'
import ReactPlaceholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'
import 'react-sweet-progress/lib/style.css'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import ScrollToTop from 'react-scroll-to-top'
import LoadingOverlay from 'react-loading-overlay'
import Web3 from 'web3'
import ZooHarmony from '../../abis/ZooHarmony.json'
import ZooHarmonyNFT from '../../abis/ZooHarmonyNFT.json'
import ZooHarmonyNFTSale from '../../abis/ZooHarmonyNFTSale.json'
import ZooHarmonyAvatars from '../../abis/ZooHarmonyAvatars.json'
import ZooHarmonyVerified from '../../abis/ZooHarmonyVerified.json'
import ZooHarmonyNFTLikes from '../../abis/ZooHarmonyNFTLikes.json'
Modal.setAppElement('#root')

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  zIndex: '999999',
  top: 0,
  left: 0,
}

const customStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    backgroundColor: '#000',
    borderColor: '#004A8B',
    borderRadius: '15px',
    padding: '40px',
    color: '#FFF',
    bottom: 'auto',
    maxWidth: '550px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const customStyle2 = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    backgroundColor: '#111',
    borderColor: '#004A8B',
    borderRadius: '15px',
    padding: '40px',
    color: '#FFF',
    bottom: 'auto',
    minWidth: '350px',
    maxWidth: '650px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const customStyle3 = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    backgroundColor: 'rgb(6 8 14)',
    borderColor: '#004A8B',
    borderRadius: '15px',
    padding: '40px',
    color: '#FFF',
    bottom: 'auto',
    maxWidth: '550px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}


class Home extends Component {
  handleOpenModal() {
    this.setState({ showModal: true })
  }

  handleOpenZOOModal() {
    this.setState({ showZOOModal: true })
  }

  handleCloseModal() {
    this.setState({ showModal: false })
    localStorage.setItem('agreed', 'true')
  }

  handleCloseZOOModal() {
    this.setState({ showZOOModal: false })
  }

  render() {
    return (
      <div>
        <ScrollToTop smooth />
        <LoadingOverlay
          active={this.state.txpend}
          spinner
          transition={false}
          text={'Waiting on...' + this.state.txs + ' transaction(s)'}
          styles={{
            overlay: base => ({
              ...base,
              background: 'rgba(0, 0, 0, 0.95)',
              position: 'fixed',
            }),
            wrapper: {
              width: '100%',
              height: '100%',
              borderRadius: '25px',
            },
          }}
        >
          <Modal
            animationDuration={1000}
            isOpen={this.state.showModal}
            contentLabel="Disclaimer"
            id="modalwarn"
            align="center"
            style={customStyle3}
            overlayClassName="myoverlay"
            onRequestClose={this.handleCloseModal}
          >
            <div align="center">
              <p>
                Welcome to the <strong>ZooHarmony NFT Marketplace</strong>! This market is open and decentralized on the
                Harmony Network. Anyone can mint NFTs and list them for sale. This results in possible fakes and
                scammers. We utilize different smart contracts to "Verify" or "Blacklist" users manually. Please use due diligence when making purchases of NFTs! When you buy a NFT here you are
                directly sending that user ZOO, there is no method of refunds. If it is too good to be true, it
                probably is!
              </p>
              <button className="btn btn-primary" onClick={this.handleCloseModal} align="center">
                I Understand
              </button>
            </div>
          </Modal>
          <Modal
            animationDuration={1000}
            isOpen={this.state.showZOOModal}
            contentLabel="ZooHarmony"
            id="modalZooHarmony"
            align="center"
            style={customStyle2}
            overlayClassName="myoverlay"
            onRequestClose={this.handleCloseZOOModal}
          >
            <button
              onClick={this.handleCloseZOOModal}
              className="btn btn-primary"
              align="right"
              style={{ top: '15px', right: '15px', position: 'absolute' }}
            >
              X
            </button>
            <h2 align="center">
              <img src="/harmonyLogo.png" border="0" height="66px" width="66px" /> <i className="fa fa-arrow-right"></i>{' '}
              <img src="/zooblue.png" border="0" height="66px" width="66px" />
            </h2>
            <br />
            <div align="center">
              <p>
                <h3>
                  Swap your <strong>ONE</strong> to <strong>ZOO</strong>
                </h3>
                <br />
                Balance{' '}
                <strong>
                  <span id="onebal">
                    {Number(this.state.onebalance)
                      .toString()
                      .slice(
                        0,
                        Number(this.state.onebalance)
                          .toString()
                          .indexOf('.') + 5,
                      )}
                  </span>
                </strong>{' '}
                ONE
                <br />
                <br />
                <form
                  onSubmit={event => {
                    event.preventDefault()
                    this.buyZooin()
                  }}
                >
                  <input
                    type="number"
                    autoComplete="off"
                    step="any"
                    onChange={event => this.changeAmount(event.target.value)}
                    className="form-control"
                    border="0"
                    id="zooamount"
                    placeholder="Amount of ONE"
                    style={{ padding: '20px' }}
                  />
                  <br />
                  Will get you{' '}
                  <strong>
                    ≈ <span id="amounttobuy">0</span>
                  </strong>{' '}
                  ZOO
                  <br />
                  <br />
                  <button
                    className="btn btn-primary swapbtn"
                    style={{ fontSize: '23px' }}
                    type="submit"
                    align="center"
                    disabled={window.web3 !== undefined ? false : true}
                  >
                    {window.web3 !== undefined ? 'SWAP' : 'CONNECT WALLET'}
                  </button>
                </form>
                <br />
                Balance{' '}
                <strong>
                  <span id="zoobal">{this.abbreviateNumber(Number(this.state.zoobalance))}</span>
                </strong>{' '}
                ZOO
                <br />
                <span style={{ color: '#999' }}>
                  Max Balance <strong>1.2 Billion</strong> ZOO
                </span>
              </p>
            </div>
          </Modal>
          <div className="col-auto mx-4" style={{ marginTop: '55px' }}></div>
          <div className="row home-adj">
            <div className="col-md-12" align="center">
              <div className="row">
                <div className="col-md-6 my-auto">
                  <h2>
                    <span className="rainbowtxt0">Claim, Mint, Gift and</span>&nbsp;&nbsp;&nbsp;
                    <span className="rainbowtxt0">Buy Special NFT by ZooHarmony/ZOO</span>
                    <br />
                    <span className="rainbowtxt0">in Harmony Blockchain</span>
                  </h2>
                  <div className="row">
                    <div className="col-md-6">
                      <a type="button" href="/mint" className="btn btn-primary rounded m-3 homeButton4">
                        <span>MINT NFT</span>
                      </a>
                    </div>
                    <div className="col-md-6">
                      <a type="button" onClick={this.handleOpenZOOModal} className="btn btn-primary rounded m-3 homeButton5">
                        <span>BUY ZOO</span>
                      </a>
                    </div>
                  </div>
                  <br />
                  <br />
                </div>
                <div className="col-md-6">
                  <ReactPlaceholder
                    type="rect"
                    ready={this.state.ready2}
                    showLoadingAnimation={true}
                    color="#333"
                    style={{
                      width: '100%',
                      height: '450px',
                      marginTop: '15px',
                      borderRadius: '15px',
                    }}
                  >
                    <a href={'/nft/' + this.state.iData_id}>
                      <div
                        style={{
                          backgroundColor: '##151a2f',
                          borderRadius: '13px',
                          border: '1px solid #20ebf0',
                          height: '100%',
                          margin: '0',
                          padding: '0',
                          width: '100%'
                        }}
                      >
                        <div className="row">
                          <div className="col-5" align="center">
                            <div className="m-2 text-light btAddress">
                              {this.state.iData_name.length > 20
                                ? this.state.iData_name.slice(0, 20) + '...'
                                : this.state.iData_name}

                              <br />
                              <span style={{ fontSize: '13px' }}>
                                Owned By <strong>{this.state.owned.substring(0, 8) + '...'}</strong>
                              </span>
                            </div>
                          </div>
                          <div className="col-2 my-auto" align="center">
                            {this.state.owned.length > 0 ? (
                              this.state.ipfs !== '' &&
                              (this.state.mim === 'image/jpeg' ||
                                this.state.mim === 'image/png' ||
                                this.state.mim === 'image/gif') ? (
                                <div
                                  style={{
                                    position: 'relative',
                                    width: '45px',
                                  }}
                                >
                                  <Img
                                    src={'https://zooharmony.mypinata.cloud/ipfs/' + this.state.ipfs}
                                    cache
                                    alt=""
                                    border="0"
                                    height="50px"
                                    width="50px"
                                    style={{ borderRadius: '50%' }}
                                  />

                                  {this.state.feature_verified === true ? (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        bottom: '-3px',
                                        right: '-1px',
                                      }}
                                    >
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 12 12"
                                        fill="#4E78FF"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z"
                                          fill="#0dcaf0"
                                        ></path>
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z"
                                          fill="#151a2f"
                                        ></path>
                                      </svg>
                                    </div>
                                  ) : null}
                                </div>
                              ) : (
                                <div
                                  style={{
                                    position: 'relative',
                                    width: '45px',
                                    marginTop: '10px',
                                    marginBottom: '0px',
                                  }}
                                >
                                  <Jazzicon diameter={45} seed={jsNumberForAddress(this.state.owned)} />
                                  {this.state.feature_verified === true ? (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        bottom: '-3px',
                                        right: '-2px',
                                      }}
                                    >
                                      <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 12 12"
                                        fill="#4E78FF"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z"
                                          fill="#0dcaf0"
                                        ></path>
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z"
                                          fill="#151a2f"
                                        ></path>
                                      </svg>
                                    </div>
                                  ) : null}
                                </div>
                              )
                            ) : null}
                          </div>
                          <div className="col-5 my-auto" align="center">
                          <div className="m-2 text-light btAddress">
                            Last Price ≈ {this.state.iData_price} ZOO
                            <br />
                            ≈${Number(this.state.iData_price_usd).toFixed(2)} USD
                          </div>
                          </div>
                        </div>

                        <div className="col-auto" style={{ height: '400px' }}>
                          {typeof this.state.iData_nftData !== 'undefined' ? (
                            this.state.iData_mimeType === 'image/jpeg' ||
                            this.state.iData_mimeType === 'image/png' ||
                            this.state.iData_mimeType === 'image/gif' ? (
                              <Img
                                alt="NFT"
                                className="token rounded"
                                src={'https://zooharmony.mypinata.cloud/ipfs/' + this.state.iData_nftData}
                                cache
                                style={{ background: '#21263e' }}
                              />
                            ) : this.state.iData_mimeType === 'video/mp4' ? (
                              <video
                                alt="NFT"
                                className="token rounded"
                                autoPlay
                                playsInline
                                muted
                                loop
                                controls
                                src={'https://zooharmony.mypinata.cloud/ipfs/' + this.state.iData_nftData}
                                type="video/mp4"
                              >
                                <source
                                  src={'https://zooharmony.mypinata.cloud/ipfs/' + this.state.iData_nftData}
                                  type="video/mp4"
                                ></source>
                              </video>
                            ) : this.state.iData_mimeType === 'model/gltf-binary' ? (
                              <model-viewer
                                src={'https://zooharmony.mypinata.cloud/ipfs/' + this.state.iData_nftData}
                                alt={this.state.iData_name}
                                ar
                                ar-modes="webxr scene-viewer quick-look"
                                environment-image="neutral"
                                auto-rotate
                                camera-controls
                                style={{ width: '100%', height: '400px' }}
                              ></model-viewer>
                            ) : null
                          ) : null}
                        </div>
                      </div>
                    </a>
                  </ReactPlaceholder>
                  <br />
                </div>
              </div>
              <br />
              <br />
              <div className="row justify-content-around">
                <h4 className="text-light">Random NFTs</h4>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.ready}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '300px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  {this.state.images.map((id, key) => {
                    return this.state.ready === true ? (
                      <div key={key} className="col-md-2 card bg-light m-3 p-2">
                        <Link
                          to={{
                            pathname: `/nft/${this.state.imageData_id[key]}`,
                            // state: {name: "vikas"}
                          }}
                        >
                          <form onSubmit={event => {}}>
                            <div className="col-auto max-250">
                              <div className="text-secondary idbadge" align="center">
                                ID #{this.state.imageData_id[key]}
                              </div>
                              {typeof this.state.imageData_nftData[key] !== 'undefined' ? (
                                this.state.imageData_mimeType[key] === 'image/jpeg' ||
                                this.state.imageData_mimeType[key] === 'image/png' ||
                                this.state.imageData_mimeType[key] === 'image/gif' ? (
                                  <Img
                                    alt="NFT"
                                    className="token rounded"
                                    src={
                                      'https://zooharmony.mypinata.cloud/ipfs/' + this.state.imageData_nftData[key]
                                    }
                                    cache
                                    style={{ background: '#21263e' }}
                                  />
                                ) : this.state.imageData_mimeType[key] === 'video/mp4' ? (
                                  <video
                                    alt="NFT"
                                    className="token rounded"
                                    autoPlay
                                    playsInline
                                    muted
                                    loop
                                    controls
                                    src={
                                      'https://zooharmony.mypinata.cloud/ipfs/' + this.state.imageData_nftData[key]
                                    }
                                    type="video/mp4"
                                  >
                                    <source
                                      src={
                                        'https://zooharmony.mypinata.cloud/ipfs/' + this.state.imageData_nftData[key]
                                      }
                                      type="video/mp4"
                                    ></source>
                                  </video>
                                ) : this.state.imageData_mimeType[key] === 'model/gltf-binary' ? (
                                  <model-viewer
                                    src={
                                      'https://zooharmony.mypinata.cloud/ipfs/' + this.state.imageData_nftData[key]
                                    }
                                    alt={this.state.imageData_name[key]}
                                    ar
                                    ar-modes="webxr scene-viewer quick-look"
                                    environment-image="neutral"
                                    auto-rotate
                                    camera-controls
                                    style={{ width: '100%', height: '250px' }}
                                  ></model-viewer>
                                ) : null
                              ) : null}
                            </div>
                            <div className="m-2" align="center">
                              {this.state.imageData_name[key]}
                            </div>
                            
                          </form>
                        </Link>
                      </div>
                    ) : null
                  })}
                </ReactPlaceholder>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.ready}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '300px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  <span style={{ display: 'none' }}>&nbsp;</span>
                </ReactPlaceholder>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.ready}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '300px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  <span style={{ display: 'none' }}>&nbsp;</span>
                </ReactPlaceholder>
              </div>
              <br />
              <div className="row justify-content-around">
                <h4 className="text-light">Fresh off the mint!</h4>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.readymint}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '300px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  {this.state.mimages.reverse().map((id, key) => {
                    return key < 5 ? (
                      this.state.readymint === true ? (
                        <div key={key} className="col-md-2 card bg-light m-3 p-2">
                          <div className="m-2 row" align="center">
                            <div className="col-6">
                              <a
                                href=""
                                onClick={e =>
                                  this.like(e, this.state.mimageData_owner[key], this.state.mimageData_id[key])
                                }
                              >
                                <span id={'count' + this.state.mimageData_id[key]}>
                                  {this.state.mimageData_likecount[key]}
                                </span>{' '}
                                <i className="fab fa-gratipay like" id={'like' + this.state.mimageData_id[key]}></i>
                              </a>
                            </div>
                            <div className="col-6">
                              <a
                                href=""
                                onClick={e =>
                                  this.ice(e, this.state.mimageData_owner[key], this.state.mimageData_id[key])
                                }
                              >
                                <span id={'counti' + this.state.mimageData_id[key]}>
                                  {this.state.mimageData_icecount[key]}
                                </span>{' '}
                                <i className="fab fa-codiepie ice" id={'ice' + this.state.mimageData_id[key]}></i>
                              </a>
                            </div>
                          </div>
                          <Link
                            to={{
                              pathname: `/nft/${this.state.mimageData_id[key]}`,
                            }}
                          >
                            <form onSubmit={event => {}}>
                              <div className="col-auto max-250">
                                <div className="text-secondary idbadge" align="center">
                                  ID #{this.state.mimageData_id[key]}
                                </div>
                                {typeof this.state.mimageData_nftData[key] !== 'undefined' ? (
                                  this.state.mimageData_mimeType[key] === 'image/jpeg' ||
                                  this.state.mimageData_mimeType[key] === 'image/png' ||
                                  this.state.mimageData_mimeType[key] === 'image/gif' ? (
                                    <Img
                                      alt="NFT"
                                      className="token rounded"
                                      src={
                                        'https://zooharmony.mypinata.cloud/ipfs/' +
                                        this.state.mimageData_nftData[key]
                                      }
                                      cache
                                      style={{ background: '#21263e' }}
                                    />
                                  ) : this.state.mimageData_mimeType[key] === 'video/mp4' ? (
                                    <video
                                      alt="NFT"
                                      className="token rounded"
                                      autoPlay
                                      playsInline
                                      muted
                                      loop
                                      controls
                                      src={
                                        'https://zooharmony.mypinata.cloud/ipfs/' +
                                        this.state.mimageData_nftData[key]
                                      }
                                      type="video/mp4"
                                    >
                                      <source
                                        src={
                                          'https://zooharmony.mypinata.cloud/ipfs/' +
                                          this.state.mimageData_nftData[key]
                                        }
                                        type="video/mp4"
                                      ></source>
                                    </video>
                                  ) : this.state.mimageData_mimeType[key] === 'model/gltf-binary' ? (
                                    <model-viewer
                                      src={
                                        'https://zooharmony.mypinata.cloud/ipfs/' +
                                        this.state.mimageData_nftData[key]
                                      }
                                      alt={this.state.mimageData_name[key]}
                                      ar
                                      ar-modes="webxr scene-viewer quick-look"
                                      environment-image="neutral"
                                      auto-rotate
                                      camera-controls
                                      style={{ width: '100%', height: '250px' }}
                                    ></model-viewer>
                                  ) : null
                                ) : null}
                              </div>
                              <div className="m-2" align="center">
                                {this.state.mimageData_name[key]}
                              </div>
                              
                            </form>
                          </Link>
                        </div>
                      ) : null
                    ) : null
                  })}
                </ReactPlaceholder>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.readymint}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '300px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  <span style={{ display: 'none' }}>&nbsp;</span>
                </ReactPlaceholder>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.readymint}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '300px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  <span style={{ display: 'none' }}>&nbsp;</span>
                </ReactPlaceholder>
              </div>
              <br />
              <div className="row">
                <div className="col-md-3" align="center" style={{ padding: '30px' }}>
                  <h3 className="text-light">
                    <p>
                      <i className="fa fa-wallet fa-2x" style={{ color: '#0dcaf0' }}></i>
                    </p>
                    Set up your wallet
                  </h3>
                  <p className="text-secondary jtlast">
                    Once you’ve set up your wallet with Metamask, connect it to ZooHarmony by clicking the "Connect Wallet"
                    button in the top right corner. Only Metamask is supported.
                  </p>
                </div>
                <div className="col-md-3" align="center" style={{ padding: '30px' }}>
                  <h3 className="text-light">
                    <p>
                      <i className="fa fa-compress-arrows-alt fa-2x" style={{ color: '#0dcaf0' }}></i>
                    </p>
                    Add your collection
                  </h3>
                  <p className="text-secondary jtlast">
                    Click "Mint a NFT" and set up your ZooHarmony NFT collection. You can also edit your profile to get a
                    biography, profile avatar, and name stored on chain.
                  </p>
                </div>
                <div className="col-md-3" align="center" style={{ padding: '30px' }}>
                  <h3 className="text-light">
                    <p>
                      <i className="fa fa-funnel-dollar fa-2x" style={{ color: '#0dcaf0' }}></i>
                    </p>
                    Mint your NFTs
                  </h3>
                  <p className="text-secondary jtlast">
                    Upload your work (image, video, audio, or 3D model), add a name, category, and description, it is
                    cheaper than ever before with ZooHarmony on the Harmony network.
                  </p>
                </div>
                <div className="col-md-3" align="center" style={{ padding: '30px' }}>
                  <h3 className="text-light">
                    <p>
                      <i className="fa fa-coins fa-2x" style={{ color: '#0dcaf0' }}></i>
                    </p>
                    List them for sale
                  </h3>
                  <p className="text-secondary jtlast">
                    Choose between auctions (coming soon) and fixed-price listings. By selling an NFT you receive ZooHarmony
                    (ZOO) which rewards you Seju Token (SEJU)
                  </p>
                </div>
              </div>
              <a type="button" href="/search" className="btn btn-primary rounded m-3 homeButton6">
                <span>SEARCH ALL MINTED</span>
              </a>
              <br />
              <br />
              <div className="row justify-content-around">
                <h4 className="text-light">Recently Purchased NFTs</h4>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.ready3}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '150px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  {this.state.tximages.reverse().map((id, key) => {
                    return key < 5 ? (
                      <div key={key} className="col-md-2 card bg-light m-3 p-2">
                        
                        <Link
                          to={{
                            pathname: `/nft/${this.state.tximageData_id[key]}`,
                          }}
                        >
                          <form onSubmit={event => {}}>
                            <div className="col-auto max-150">
                              <div className="text-secondary idbadge" align="center">
                                ID #{this.state.tximageData_id[key]}
                              </div>
                              {typeof this.state.tximageData_nftData[key] !== 'undefined' ? (
                                this.state.tximageData_mimeType[key] === 'image/jpeg' ||
                                this.state.tximageData_mimeType[key] === 'image/png' ||
                                this.state.tximageData_mimeType[key] === 'image/gif' ? (
                                  <Img
                                    alt="NFT"
                                    className="token rounded"
                                    src={
                                      'https://zooharmony.mypinata.cloud/ipfs/' + this.state.tximageData_nftData[key]
                                    }
                                    cache
                                    style={{ background: '#21263e' }}
                                  />
                                ) : this.state.tximageData_mimeType[key] === 'video/mp4' ? (
                                  <video
                                    alt="NFT"
                                    className="token rounded"
                                    autoPlay
                                    playsInline
                                    muted
                                    loop
                                    controls
                                    src={
                                      'https://zooharmony.mypinata.cloud/ipfs/' + this.state.tximageData_nftData[key]
                                    }
                                    type="video/mp4"
                                  >
                                    <source
                                      src={
                                        'https://zooharmony.mypinata.cloud/ipfs/' +
                                        this.state.tximageData_nftData[key]
                                      }
                                      type="video/mp4"
                                    ></source>
                                  </video>
                                ) : this.state.tximageData_mimeType[key] === 'model/gltf-binary' ? (
                                  <model-viewer
                                    src={
                                      'https://zooharmony.mypinata.cloud/ipfs/' + this.state.tximageData_nftData[key]
                                    }
                                    alt={this.state.tximageData_name[key]}
                                    ar
                                    ar-modes="webxr scene-viewer quick-look"
                                    environment-image="neutral"
                                    auto-rotate
                                    camera-controls
                                    style={{ width: '100%', height: '250px' }}
                                  ></model-viewer>
                                ) : null
                              ) : null}
                            </div>
                            <div className="m-2" align="center">
                              {this.state.tximageData_name[key].length > 15
                                ? this.state.tximageData_name[key].substring(0, 15) + '...'
                                : this.state.tximageData_name[key]}
                            </div>
                            <div className="m-2" align="center">
                              {this.state.tximageData_buyeripfs[key] !== '' &&
                              (this.state.tximageData_buyermim[key] === 'image/jpeg' ||
                                this.state.tximageData_buyermim[key] === 'image/png' ||
                                this.state.tximageData_buyermim[key] === 'image/gif') ? (
                                <div
                                  style={{
                                    position: 'relative',
                                    width: '45px',
                                  }}
                                >
                                  <img
                                    src={
                                      'https://zooharmony.mypinata.cloud/ipfs/' +
                                      this.state.tximageData_buyeripfs[key]
                                    }
                                    alt=""
                                    border="0"
                                    height="50px"
                                    width="50px"
                                    style={{ borderRadius: '50%' }}
                                  />

                                  {this.state.tximageData_verified[key] === true ? (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        bottom: '-3px',
                                        right: '-1px',
                                      }}
                                    >
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 12 12"
                                        fill="#4E78FF"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z"
                                          fill="#0dcaf0"
                                        ></path>
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z"
                                          fill="#151a2f"
                                        ></path>
                                      </svg>
                                    </div>
                                  ) : null}
                                </div>
                              ) : (
                                <div
                                  style={{
                                    position: 'relative',
                                    marginTop: '10px',
                                    marginBottom: '0px',
                                    width: '45px',
                                  }}
                                >
                                  <Jazzicon
                                    diameter={45}
                                    seed={jsNumberForAddress(this.state.tximageData_buyer[key])}
                                  />

                                  {this.state.tximageData_verified[key] === true ? (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        bottom: '-3px',
                                        right: '-2px',
                                      }}
                                    >
                                      <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 12 12"
                                        fill="#4E78FF"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z"
                                          fill="#0dcaf0"
                                        ></path>
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z"
                                          fill="#151a2f"
                                        ></path>
                                      </svg>
                                    </div>
                                  ) : null}
                                </div>
                              )}{' '}
                            </div>

                            <div className="m-2" align="center">
                              <strong>SOLD</strong> {this.state.tximageData_boughtprice[key]} ZOO
                              <br />
                              <span style={{ fontSize: '13px' }}>
                                ≈ ${this.state.tximageData_usdprice[key]} <small>USD</small> or ≈{' '}
                                {this.state.tximageData_oneprice[key]} <small>ONE</small>
                              </span>
                            </div>
                          
                          </form>
                        </Link>
                      </div>
                    ) : null
                  })}
                </ReactPlaceholder>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.ready3}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '150px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  <span style={{ display: 'none' }}>&nbsp;</span>
                </ReactPlaceholder>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.ready3}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '150px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  <span style={{ display: 'none' }}>&nbsp;</span>
                </ReactPlaceholder>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.ready3}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '150px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  <span style={{ display: 'none' }}>&nbsp;</span>
                </ReactPlaceholder>
                <ReactPlaceholder
                  type="rect"
                  ready={this.state.ready3}
                  showLoadingAnimation={true}
                  color="#333"
                  style={{
                    width: '150px',
                    height: '300px',
                    marginTop: '15px',
                    borderRadius: '15px',
                  }}
                >
                  <span style={{ display: 'none' }}>&nbsp;</span>
                </ReactPlaceholder>
              </div>
              <br />
              <br />
            </div>
          </div>
        </LoadingOverlay>
        <ReactCanvasConfetti refConfetti={this.getInstance} style={canvasStyles} />
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      sale_contract: null,
      totalSupply: 0,
      images: [],
      owners: [],
      percent: 0,
      oneamount: 0,
      minted: [],
      mintedcollection: '',
      onebalance: 0,
      zoobalance: 0,
      showModal: false,
      showZOOModal: false,
      txpend: false,
      txs: 0,
      imageData_name: [],
      imageData_nftData: [],
      imageData_mimeType: [],
      imageData_category: [],
      imageData_price: [],
      imageData_id: [],
      imageData_owner: [],
      imageData_icecount: [],
      imageData_likecount: [],
      mimages: [],
      mimageData_name: [],
      mimageData_nftData: [],
      mimageData_mimeType: [],
      mimageData_category: [],
      mimageData_price: [],
      mimageData_id: [],
      mimageData_owner: [],
      mimageData_icecount: [],
      mimageData_likecount: [],
      tximages: [],
      tximageData_name: [],
      tximageData_nftData: [],
      tximageData_mimeType: [],
      tximageData_category: [],
      tximageData_price: [],
      tximageData_id: [],
      tximageData_buyer: [],
      tximageData_boughtprice: [],
      tximageData_buyeripfs: [],
      tximageData_buyermim: [],
      tximageData_buyername: [],
      tximageData_verified: [],
      tximageData_usdprice: [],
      tximageData_oneprice: [],
      tximageData_icecount: [],
      tximageData_likecount: [],
      gtximages: [],
      gtximageData_name: [],
      gtximageData_nftData: [],
      gtximageData_mimeType: [],
      gtximageData_category: [],
      gtximageData_price: [],
      gtximageData_id: [],
      gtximageData_receiver: [],
      gtximageData_boughtprice: [],
      gtximageData_buyeripfs: [],
      gtximageData_buyermim: [],
      gtximageData_buyername: [],
      gtximageData_verified: [],
      feature_verified: [],
      iData_name: [],
      iData_nftData: [],
      iData_mimeType: [],
      iData_category: [],
      iData_price: [],
      iData_id: [],
      ready2: false,
      ready3: false,
      readymint: false,
      selling_to: '',
      selling_price: null,
      token_sale_contract: null,
      token_price: 0,
      zooamount: 0,
      approved: [],
      blackListed: [],
      owned: '',
      ipfs: '',
      mim: '',
      name: '',
      transactions: [],
      gtransactions: [],
    }
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleOpenZOOModal = this.handleOpenZOOModal.bind(this)
    this.handleCloseZOOModal = this.handleCloseZOOModal.bind(this)
  }

  async componentWillMount() {
    this.state.tximages = []
    this.state.tximageData_name = []
    this.state.tximageData_nftData = []
    this.state.tximageData_mimeType = []
    this.state.tximageData_category = []
    this.state.tximageData_price = []
    this.state.tximageData_id = []
    this.state.tximageData_buyer = []
    this.state.tximageData_boughtprice = []
    this.state.tximageData_buyeripfs = []
    this.state.tximageData_buyermim = []
    this.state.tximageData_buyername = []
    this.state.tximageData_verified = []
    this.state.mimages = []
    this.state.mimageData_name = []
    this.state.mimageData_nftData = []
    this.state.mimageData_mimeType = []
    this.state.mimageData_category = []
    this.state.mimageData_price = []
    this.state.mimageData_id = []
    this.state.ready3 = false
    this.state.ready2 = false
    this.state.feature_verified = []
    this.state.iData_name = []
    this.state.iData_nftData = []
    this.state.iData_mimeType = []
    this.state.iData_category = []
    this.state.iData_price = []
    this.state.iData_id = []
    this.state.owned = ''
    this.state.ipfs = ''
    this.state.mim = ''
    this.state.transactions = []

    await this.loadBlockchainData()
  }

  makeShot = (particleRatio, opts) => {
    this.animationInstance &&
      this.animationInstance({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      })
  }

  fire = () => {
    this.makeShot(0.25, {
      spread: 50,
      startVelocity: 55,
    })

    this.makeShot(0.2, {
      spread: 80,
    })

    this.makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })

    this.makeShot(0.1, {
      spread: 200,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.5,
    })

    this.makeShot(0.1, {
      spread: 200,
      startVelocity: 45,
    })
  }

  handlerFire = () => {
    this.fire()
  }

  getInstance = instance => {
    this.animationInstance = instance
  }

  abbreviateNumber = number => {
    // what tier? (determines SI symbol)
    var tier = (Math.log10(Math.abs(number)) / 3) | 0

    // if zero, we don't need a suffix
    if (tier === 0) return number

    var SI_SYMBOL = ['', 'k', 'M', 'B', 'T', 'P', 'E']

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier]
    var scale = Math.pow(10, tier * 3)

    // scale the number
    var scaled = number / scale

    // format number and add suffix
    return scaled.toFixed(1) + suffix
  }

  buyZooin = () => {
    const web3 = window.web3
    this.setState({ txpend: true })
    this.setState({ txs: 2 })


    const oneabi = [{"type":"event","inputs":[{"name":"src","type":"address","internalType":"address","indexed":true},{"type":"address","indexed":true,"name":"guy","internalType":"address"},{"internalType":"uint256","type":"uint256","indexed":false,"name":"wad"}],"anonymous":false,"name":"Approval"},{"anonymous":false,"name":"Deposit","inputs":[{"internalType":"address","name":"dst","type":"address","indexed":true},{"indexed":false,"internalType":"uint256","type":"uint256","name":"wad"}],"type":"event"},{"type":"event","anonymous":false,"inputs":[{"indexed":true,"type":"address","internalType":"address","name":"src"},{"indexed":true,"name":"dst","internalType":"address","type":"address"},{"indexed":false,"name":"wad","type":"uint256","internalType":"uint256"}],"name":"Transfer"},{"name":"Withdrawal","type":"event","inputs":[{"name":"src","indexed":true,"type":"address","internalType":"address"},{"type":"uint256","indexed":false,"name":"wad","internalType":"uint256"}],"anonymous":false},{"name":"allowance","type":"function","stateMutability":"view","outputs":[{"internalType":"uint256","type":"uint256","name":""}],"inputs":[{"name":"","type":"address","internalType":"address"},{"type":"address","internalType":"address","name":""}]},{"type":"function","inputs":[{"name":"","type":"address","internalType":"address"}],"name":"balanceOf","stateMutability":"view","outputs":[{"name":"","type":"uint256","internalType":"uint256"}]},{"inputs":[],"stateMutability":"view","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"decimals","type":"function"},{"outputs":[{"internalType":"string","name":"","type":"string"}],"name":"name","type":"function","stateMutability":"view","inputs":[]},{"name":"symbol","type":"function","inputs":[],"stateMutability":"view","outputs":[{"type":"string","internalType":"string","name":""}]},{"type":"receive","stateMutability":"payable"},{"stateMutability":"payable","name":"deposit","type":"function","inputs":[],"outputs":[]},{"name":"withdraw","type":"function","outputs":[],"inputs":[{"type":"uint256","name":"wad","internalType":"uint256"}],"stateMutability":"nonpayable"},{"name":"totalSupply","inputs":[],"stateMutability":"view","outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"type":"function"},{"inputs":[{"type":"address","internalType":"address","name":"guy"},{"type":"uint256","internalType":"uint256","name":"wad"}],"type":"function","stateMutability":"nonpayable","name":"approve","outputs":[{"type":"bool","internalType":"bool","name":""}]},{"name":"transfer","stateMutability":"nonpayable","type":"function","inputs":[{"name":"dst","internalType":"address","type":"address"},{"internalType":"uint256","type":"uint256","name":"wad"}],"outputs":[{"name":"","internalType":"bool","type":"bool"}]},{"name":"transferFrom","type":"function","inputs":[{"internalType":"address","name":"src","type":"address"},{"name":"dst","internalType":"address","type":"address"},{"name":"wad","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"}]


    const zooharmonyabi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"zooAmount","type":"uint256"}],"name":"getEstimatedONEforZOO","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"oneAmount","type":"uint256"}],"name":"getEstimatedZOOforONE","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapRouter","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"zooAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"zooharmony","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]


    const contractzooharmony = new web3.eth.Contract(zooharmonyabi, '0x69C3296BeB2bb344Cb5A3a84aBEb068ef8b8A662') //ZooHarmonyViper

    const contractone = new web3.eth.Contract(oneabi, '0x7466d7d0C21Fa05F32F5a0Fa27e12bdC06348Ce2') // WONE

    const slippage = this.state.zooamount

    console.log(slippage)

    contractzooharmony.methods
      .getEstimatedONEforZOO(slippage.toString())
      .call()
      .then(receipt => {
        const estone = receipt[0]
        console.log(estone)

        contractone.methods
          .approve('0x69C3296BeB2bb344Cb5A3a84aBEb068ef8b8A662', estone)
          .send({ from: this.state.account })
          .once('receipt', receipt => {
            this.setState({ txpend: true })
            this.setState({ txs: 1 })

            // make new deadline one hour from now in epoch unix time
            const deadline = Math.floor(Date.now() / 1000) + 6000
            console.log(deadline)

            contractzooharmony.methods
              .zooharmony(slippage.toString(), deadline)
              .send({ from: this.state.account, value: estone })
              .once('receipt', async receipt => {
                this.setState({ txpend: false })
                this.setState({ txs: 0 })

                this.handlerFire()

                //console.log(receipt);

                console.log('Zooined ONE to ZOO successfully!')
              })
              .catch(error => {
                // Transaction rejected or failed

                alert('Transaction failed on  Zooining from ONE!')
                this.setState({ txpend: false })
              })
          })
          .catch(error => {
            // Transaction rejected or failed
            console.log(error)
            alert('Transaction failed on ONE approval!')
            this.setState({ txpend: false })
          })
      })
      .catch(error => {
        console.log(error)
        alert('Failed to get ZooHarmony estimate!')
        this.setState({ txpend: false })
      })
  }

  changeAmount = amount => {
    if (amount > 0) {
      
      const web3 = new Web3('https://api.s0.b.hmny.io')

      const zooharmonyabi2 = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"zooAmount","type":"uint256"}],"name":"getEstimatedONEforZOO","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"oneAmount","type":"uint256"}],"name":"getEstimatedZOOforONE","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapRouter","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"zooAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"zooharmony","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]


      const contractzooharmony2 = new web3.eth.Contract(zooharmonyabi2, '0x69C3296BeB2bb344Cb5A3a84aBEb068ef8b8A662') //ZooHarmonyViper

      // console.log(slippage);

      this.setState({ oneamount: amount })

      var SI_SYMBOL = ['', 'k', 'M', 'B', 'T', 'P', 'E']

      function abbreviateNumber(number) {
        // what tier? (determines SI symbol)
        var tier = (Math.log10(Math.abs(number)) / 3) | 0

        // if zero, we don't need a suffix
        if (tier == 0) return number

        // get suffix and determine scale
        var suffix = SI_SYMBOL[tier]
        var scale = Math.pow(10, tier * 3)

        // scale the number
        var scaled = number / scale

        // format number and add suffix
        return scaled.toFixed(1) + suffix
      }

      contractzooharmony2.methods
        .getEstimatedZOOforONE(web3.utils.toWei(amount.toString(), 'ether'))
        .call()
        .then(receipt => {
          const estzoo = receipt[1]
          console.log(estzoo)

          this.setState({ zooamount: estzoo })

          document.getElementById('amounttobuy').innerHTML = abbreviateNumber(estzoo / 1e18)
        })
        .catch(error => {
          console.log(error)
          alert('Failed to get ZooHarmony estimate!')
        })
    } else {
      document.getElementById('amounttobuy').innerHTML = 0
    }
  }

  async like(e, owner, key) {
    e.preventDefault()
    e.stopPropagation()

    document.getElementById('like' + key).classList.add('fa-pulse')

    const web3t = window.web3

    const accounts = await window.web3.eth.getAccounts()
    const acct = accounts[0]
    console.log('set account')

    const abilike = ZooHarmonyNFTLikes.abi
    const contractlike = new web3t.eth.Contract(abilike, '0x134635EFaDD167d42785d89e5651d372bC55969c')

    contractlike.methods
      .LikeNFT(owner, key)
      .send({ from: acct })
      .once('receipt', receipt => {
        console.log('NFT Liked!')
        document.getElementById('like' + key).classList.remove('fa-pulse')
        document.getElementById('like' + key).classList.add('liked')
        document.getElementById('count' + key).innerHTML = Number(document.getElementById('count' + key).innerHTML) + 1

        // this.setState({ txpend: false })
        // this.setState({ txs: 0 })
      })
      .catch(error => {
        // Transaction rejected or failed
        document.getElementById('like' + key).classList.remove('fa-pulse')
        alert('Like failed!')
        console.log(error)
        // this.setState({ txpend: false });
      })
  }

  async ice(e, owner, key) {
    e.preventDefault()
    e.stopPropagation()

    document.getElementById('ice' + key).classList.add('fa-pulse')

    const web3t = window.web3

    const web3one = new Web3('https://api.s0.b.hmny.io')

    const accounts = await window.web3.eth.getAccounts()
    const acct = accounts[0]
    console.log('set account')

    const networkId = 1666700000
    const networkData = ZooHarmonyNFT.networks[1666700000]
    const abi = ZooHarmonyNFT.abi
    const address = networkData.address
    const contract = new web3one.eth.Contract(abi, address)

    // Get minter of NFT
    const minted = await contract.getPastEvents('Transfer', {
      fromBlock: 0,
      toBlock: 'latest',
    })
    const minted = await contract.getPastEvents('Transfer', {
      fromBlock: 20523921,
      toBlock: 'latest',
    })

    for (var i = 0; i < minted.length; i++) {
      this.setState({ minted: [...this.state.minted, minted[i].returnValues] })
    }

    // console.log(this.state.minted)

    for (i = 0; i < this.state.minted.length; i++) {
      // console.log(this.state.transactions[i]._buyer)
      // console.log(this.state.minted[i].tokenId)
      if (this.state.minted[i].tokenId == key) {
        // console.log('hoorah!');
        if (this.state.minted[i].from == '0x0000000000000000000000000000000000000000') {
          // console.log('hoorah TWICE!')
          // console.log(this.state.minted[i].to);
          this.setState({ mintedcollection: this.state.minted[i].to })
        }
      }
      
    }


    const abilike = ZooHarmonyNFTLikes.abi
    const contractlike = new web3t.eth.Contract(abilike, '0x134635EFaDD167d42785d89e5651d372bC55969c')

    const abib = ZooHarmony.abi
    const addressb = '0x8c59d7A7cEFa2Ae0EdB0b4051628d0f91B3b3c62' //Zoo
    const token_contract = new web3t.eth.Contract(abib, addressb)

    const iceprice = '500'

    token_contract.methods
      .approve('0x134635EFaDD167d42785d89e5651d372bC55969c', web3one.utils.toWei(iceprice, 'ether'))
      .send({ from: acct })
      .once('receipt', receipt => {
        contractlike.methods
          .IceNFT(this.state.mintedcollection, key)
          .send({ from: acct })
          .once('receipt', receipt => {
            console.log('NFT Liked!')
            document.getElementById('ice' + key).classList.remove('fa-pulse')
            document.getElementById('ice' + key).classList.add('iced')
            document.getElementById('counti' + key).innerHTML =
              Number(document.getElementById('counti' + key).innerHTML) + 5

            // this.setState({ txpend: false })
            // this.setState({ txs: 0 })
          })
          .catch(error => {
            // Transaction rejected or failed
            document.getElementById('ice' + key).classList.remove('fa-pulse')
            alert('Ice failed!')
            console.log(error)
            // this.setState({ txpend: false });
          })
      })
      .catch(error => {
        // Transaction rejected or failed
        document.getElementById('ice' + key).classList.remove('fa-pulse')
        alert('Ice failed!')
        console.log(error)
        // this.setState({ txpend: false });
      })
  }

  async loadBlockchainData() {
    // window.loaded_web3 = false;

    function randomNumber(min, max) {
      return Math.random() * (max - min) + min
    }

    if (localStorage.getItem('agreed') === 'true') {
      this.setState({ showModal: false })
    } else {
      this.setState({ showModal: true })
    }

    const web3 = window.web3

    const web3t = new Web3('https://api.s0.b.hmny.io')


    if (typeof web3 !== 'undefined') {

      const accounts = await web3.eth.getAccounts()

      this.setState({ account: accounts[0] })
      this.setState({ connected: true })

      const chainId = await web3.eth.getChainId()

      if (chainId === 1666700000) {
        this.setState({ connected: true })
        console.log(this.state.connected)
        console.log(this.state.account)
      } else {
        this.setState({ connected: false })
      }
    }

    setInterval(async () => {
      if (typeof web3 !== 'undefined' && this.state.showZOOModal === true) {
        console.log('start typing number??')
        const onebalance = web3.utils.fromWei(await web3.eth.getBalance(this.state.account), 'ether')
        if (onebalance > 0 && typeof onebalance !== 'undefined') {
          this.setState({ onebalance })

          document.getElementById('onebal').innerHTML = Number(onebalance).toFixed(4)

          const abia = ZooHarmony.abi
          const addr = '0x8c59d7A7cEFa2Ae0EdB0b4051628d0f91B3b3c62'
          const contract = new web3.eth.Contract(abia, addr)
          const zoobal = await contract.methods.balanceOf(this.state.account).call()
          if (zoobal > 0 && zoobal !== null) {
            const zoobalance2 = web3.utils.fromWei(zoobal, 'ether')
            const zoobalance = zoobalance2

            this.setState({ zoobalance })

            document.getElementById('zoobal').innerHTML = this.abbreviateNumber(Number(zoobalance))
          }
        }
      }
    }, 1234)

    const networkId = 1666700000

    const blackListed = []
    this.setState({ blackListed })

    const sale_networkData = ZooHarmonyNFTSale.networks[networkId]
    const sale_abi = ZooHarmonyNFTSale.abi
    const sale_address = sale_networkData.address
    const sale_contract = new web3t.eth.Contract(sale_abi, sale_address)
    this.setState({ sale_contract })

    const networkData = ZooHarmonyNFT.networks[networkId]
    const abi = ZooHarmonyNFT.abi
    const address = networkData.address
    const contract = new web3t.eth.Contract(abi, address)

    const abiv = ZooHarmonyVerified.abi
    const addv = '0x42EFf5e024165fa0D18b6CB4a1C59Cf3d5353871' //ZooHarmonyVerified
    const contractv = new web3t.eth.Contract(abiv, addv)

    const abia = ZooHarmonyAvatars.abi
    const addr = '0x69Eb4107F223415bf0369305380D9348bb0635d4' //ZooHarmonyAvatars
    const contractav = new web3t.eth.Contract(abia, addr)

    const abip = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getLatestONEPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pairAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getLatestTokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

    const addp = '0x8CD25Ea68fbe5402b51df2b4396529AD8E7777AC' //ZooHarmonyPriceOracle
    const contractp = new web3t.eth.Contract(abip, addp)
    this.setState({ contractp })

    const oneprice = (await contractp.methods.getLatestONEPrice().call()) / 1e8
    const zooperone = await contractp.methods.getLatestTokenPrice('0xbc1dcd02138ebebb34c90cd15fa20f1566a6fa85', 1).call() // ZOO - ONE Pairs
    const zoousd = oneprice / (zooperone / 1e18)

    const abilike = ZooHarmonyNFTLikes.abi
    const contractlike = new web3t.eth.Contract(abilike, '0x134635EFaDD167d42785d89e5651d372bC55969c')

    const abiblack = [{"stateMutability":"nonpayable","type":"constructor","inputs":[]},{"type":"event","name":"SetBlackListedAddress","inputs":[{"internalType":"address","indexed":true,"name":"hashAddress","type":"address"},{"name":"blacklisted","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"inputs":[{"name":"nftID","indexed":true,"type":"uint256","internalType":"uint256"},{"name":"blacklisted","type":"bool","indexed":false,"internalType":"bool"}],"name":"SetBlackListedNFT","anonymous":false,"type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idupdates","type":"function","outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"inputs":[],"name":"owner","stateMutability":"view","type":"function","outputs":[{"internalType":"address","type":"address","name":""}]},{"type":"function","outputs":[{"type":"address","name":"","internalType":"address"}],"stateMutability":"view","name":"updates","inputs":[{"type":"uint256","internalType":"uint256","name":""}]},{"outputs":[],"stateMutability":"nonpayable","inputs":[{"internalType":"address","name":"addy","type":"address"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"type":"function","name":"setBlackListedAddress"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedNFT","outputs":[],"type":"function","stateMutability":"nonpayable"},{"outputs":[{"type":"bool","internalType":"bool","name":""}],"stateMutability":"view","name":"getBlackListedAddress","inputs":[{"name":"blAddress","internalType":"address","type":"address"}],"type":"function"},{"type":"function","name":"getBlackListedNFT","inputs":[{"name":"nftID","type":"uint256","internalType":"uint256"}],"stateMutability":"view","outputs":[{"internalType":"bool","type":"bool","name":""}]},{"stateMutability":"view","name":"AddyCount","type":"function","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"inputs":[]},{"outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"type":"function","inputs":[],"name":"IDCount","stateMutability":"view"}]      

    const contractblack = new web3t.eth.Contract(abiblack, '0x7240b11e663Dd45d4e1fDb77e691d82a8b72fE7C')

    var SI_SYMBOL = ['', 'k', 'M', 'B', 'T', 'P', 'E']

    function abbreviateNumber(number) {
      // what tier? (determines SI symbol)
      var tier = (Math.log10(Math.abs(number)) / 3) | 0

      // if zero, we don't need a suffix
      if (tier == 0) return number

      // get suffix and determine scale
      var suffix = SI_SYMBOL[tier]
      var scale = Math.pow(10, tier * 3)

      // scale the number
      var scaled = number / scale

      // format number and add suffix
      return scaled.toFixed(1) + suffix
    }

    if (typeof web3 !== 'undefined') {
      const onebalance = web3.utils.fromWei(await web3.eth.getBalance(this.state.account), 'ether')
      this.setState({ onebalance })
      console.log('your one balance', onebalance)
    }

    if (typeof web3 !== 'undefined') {
      const abia = ZooHarmony.abi
      const addr = '0x8c59d7A7cEFa2Ae0EdB0b4051628d0f91B3b3c62'
      const contract = new web3.eth.Contract(abia, addr)
      const zoobal = await contract.methods.balanceOf(this.state.account).call()
      const zoobalance2 = web3.utils.fromWei(zoobal, 'ether')
      const zoobalance = zoobalance2
      console.log('your zoo balance', zoobalance)

      this.setState({ zoobalance })
    }

    this.setState({ contractblack })

    this.setState({ contractlike })

    // console.log(contract)
    this.setState({ contractav })
    // console.log(contract)
    this.setState({ contractv })

    this.setState({ contract })

    const totalSupply = await contract.methods.totalSupply().call()
    // console.log('total supply of',totalSupply)
    this.setState({ totalSupply })

    // console.log(sale_contract)
    const transactions = await sale_contract.getPastEvents('BoughtNFT', {
    fromBlock: 20523921,
    toBlock: 'latest',
    })

    const gtransactions = await sale_contract.getPastEvents('GiftedNFT', {
      fromBlock: 20523921,
      toBlock: 'latest',
      })
    // console.log(transactions)

    // if (this.state.transactions !== transactions) {
    this.setState({ transactions: transactions })

    this.setState({ gtransactions: gtransactions })
    // }

    // console.log(gtransactions);

    var SI_SYMBOL = ['', 'k', 'M', 'B', 'T', 'P', 'E']

    function abbreviateNumber(number) {
      // what tier? (determines SI symbol)
      var tier = (Math.log10(Math.abs(number)) / 3) | 0

      // if zero, we don't need a suffix
      if (tier == 0) return number

      // get suffix and determine scale
      var suffix = SI_SYMBOL[tier]
      var scale = Math.pow(10, tier * 3)

      // scale the number
      var scaled = number / scale

      // format number and add suffix
      return scaled.toFixed(1) + suffix
    }

    var randomnum2 = parseInt(randomNumber(0, totalSupply))
    const blacklisted = await contractblack.methods.getBlackListedNFT(randomnum2).call()
    if (!blacklisted) {
      const metadata = await contract.methods.imageData(randomnum2).call()

      // console.log(metadata)
      this.setState({ iData_name: metadata.name })
      this.setState({ iData_nftData: metadata.nftData })
      this.setState({ iData_category: metadata.category })
      this.setState({ iData_price: abbreviateNumber(metadata.price) })
      this.setState({ iData_des: metadata.description })
      this.setState({ iData_url: metadata.url })
      this.setState({ iData_mimeType: metadata.mimeType })
      this.setState({ iData_id: randomnum2 })
      this.setState({ iData_price_usd: metadata.price * zoousd })

      const owned = await contract.methods.ownerOf(randomnum2).call()
      // console.log(owner)
      this.setState({ owned })
      const getVerified = await contractv.methods.getVerified(this.state.owned).call()
      this.setState({ feature_verified: getVerified })

      if (owned !== '') {
        const getIPFS = await contractav.methods.getIPFSHash(owned).call()
        // console.log(getIPFS)
        const getMIME = await contractav.methods.getMIMEType(owned).call()
        // console.log(getMIME)
        const getName = await contractav.methods.getName(owned).call()
        // console.log(getName)
        this.setState({ ipfs: getIPFS })
        this.setState({ mim: getMIME })
        this.setState({ name: getName })

        this.setState({ ready2: true })
      }
    }

    var j = 0
    for (var k = this.state.totalSupply; k--; ) {
      // i = 159
      // console.log(j)
      if (j < 5) {
        const blacklisted = await contractblack.methods.getBlackListedNFT(k).call()
        if (!blacklisted) {
          const metadata = await contract.methods.imageData(k).call()
          const owner = await contract.methods.ownerOf(k).call()
          const likecount = await contractlike.methods.nftLikes(k).call()
          const icecount = await contractlike.methods.nftDiamonds(k).call()
          // console.log(metadata)
          this.setState({
            mimages: [...this.state.mimages, metadata.name],
            mimageData_name: [...this.state.mimageData_name, metadata.name],
            mimageData_nftData: [...this.state.mimageData_nftData, metadata.nftData],
            mimageData_mimeType: [...this.state.mimageData_mimeType, metadata.mimeType],
            mimageData_category: [...this.state.mimageData_category, metadata.category],
            mimageData_price: [...this.state.mimageData_price, metadata.price],
            mimageData_owner: [...this.state.mimageData_owner, owner],
            mimageData_likecount: [...this.state.mimageData_likecount, likecount.likes],
            mimageData_icecount: [...this.state.mimageData_icecount, icecount.diamonds],
            mimageData_id: [...this.state.mimageData_id, k],
          })
          j++

          // console.log(this.state.mimages)
          if (j === 5) {
            this.setState({ readymint: true })
            // console.log(this.state.readymint)
            break
          }
        }
      } else {
        break
      }
    }

    var numtofeature = 5

    fetch('https://rpc.zoo-harmony.com/rpc/harmony.json', {
      mode: 'cors',
    })
      .then(response => {
        console.log(response);
        return response.json()
      })
      .then(data => {
        // Work with JSON data here
        console.log(data);
        console.log(data.length)
        for (var b = numtofeature; b--; ) {
          var randomnum = parseInt(randomNumber(0, data.length))
          
          this.setState({
            images: [...this.state.images, data[randomnum]],
            imageData_name: [...this.state.imageData_name, data[randomnum].name],
            imageData_nftData: [...this.state.imageData_nftData, data[randomnum].nftData],
            imageData_mimeType: [...this.state.imageData_mimeType, data[randomnum].mimeType],
            imageData_category: [...this.state.imageData_category, data[randomnum].category],
            imageData_price: [...this.state.imageData_price, data[randomnum].price],
            imageData_owner: [...this.state.imageData_owner, data[randomnum].owner],
            imageData_id: [...this.state.imageData_id, data[randomnum].id],
          })
          // console.log(b)
          this.setState({ ready: true })
        }
      })
      .catch(err => {
        // Do something for an error here
        // console.log('Error Reading data ' + err)
      })

   
    if (transactions.length > 0) {
      for (var i = transactions.length; i--; ) {
        var transaction = this.state.transactions[i]
        
        if (typeof transaction !== 'undefined') {
          if (transaction.returnValues !== 'undefined') {
            const metadata = await contract.methods.imageData(transaction.returnValues._tokenId).call()

            const getIPFS = await contractav.methods.getIPFSHash(transaction.returnValues._buyer).call()
            const getMIME = await contractav.methods.getMIMEType(transaction.returnValues._buyer).call()
            const getVerified = await contractv.methods.getVerified(transaction.returnValues._buyer).call()

            
            this.setState({
              tximages: [...this.state.tximages, metadata.name],
              tximageData_name: [...this.state.tximageData_name, metadata.name],
              tximageData_nftData: [...this.state.tximageData_nftData, metadata.nftData],
              tximageData_mimeType: [...this.state.tximageData_mimeType, metadata.mimeType],
              tximageData_category: [...this.state.tximageData_category, metadata.category],
              tximageData_price: [...this.state.tximageData_price, metadata.price],
              tximageData_buyer: [...this.state.tximageData_buyer, transaction.returnValues._buyer],
              tximageData_boughtprice: [
                ...this.state.tximageData_boughtprice,
                abbreviateNumber(transaction.returnValues._price),
              ],
              tximageData_buyeripfs: [...this.state.tximageData_buyeripfs, getIPFS],
              tximageData_buyermim: [...this.state.tximageData_buyermim, getMIME],
              tximageData_verified: [...this.state.tximageData_verified, getVerified],
              tximageData_usdprice: [
                ...this.state.tximageData_usdprice,
                Number(transaction.returnValues._price * zoousd).toFixed(2),
              ],
              tximageData_oneprice: [
                ...this.state.tximageData_oneprice,
                Number((transaction.returnValues._price / zooperone) * 1e18).toFixed(2),
              ],
              tximageData_id: [...this.state.tximageData_id, transaction.returnValues._tokenId],
            })

            this.setState({ ready3: true })
          }
        }
      }
    }

    if (gtransactions.length > 0) {
      var n = gtransactions.length
      while (n--) {
        var gtransaction = this.state.gtransactions[n]
        
        if (typeof gtransaction !== 'undefined') {
          if (gtransaction.returnValues !== 'undefined') {
            const metadata = await contract.methods.imageData(gtransaction.returnValues._tokenId).call()

            const getIPFS = await contractav.methods.getIPFSHash(gtransaction.returnValues._receiver).call()
            const getMIME = await contractav.methods.getMIMEType(gtransaction.returnValues._receiver).call()
            const getVerified = await contractv.methods.getVerified(gtransaction.returnValues._receiver).call()


            // console.log(metadata)
            this.setState({
              gtximages: [...this.state.gtximages, metadata.name],
              gtximageData_name: [...this.state.gtximageData_name, metadata.name],
              gtximageData_nftData: [...this.state.gtximageData_nftData, metadata.nftData],
              gtximageData_mimeType: [...this.state.gtximageData_mimeType, metadata.mimeType],
              gtximageData_category: [...this.state.gtximageData_category, metadata.category],
              gtximageData_price: [...this.state.gtximageData_price, metadata.price],
              gtximageData_receiver: [...this.state.gtximageData_receiver, gtransaction.returnValues._receiver],
              gtximageData_buyeripfs: [...this.state.gtximageData_buyeripfs, getIPFS],
              gtximageData_buyermim: [...this.state.gtximageData_buyermim, getMIME],
              gtximageData_verified: [...this.state.gtximageData_verified, getVerified],
              gtximageData_id: [...this.state.gtximageData_id, gtransaction.returnValues._tokenId],
            })

            this.setState({ readyg: true })
            // }
          }
        }
      }
    }

    setInterval(async () => {
      this.state.images = []
      this.state.owners = []
      this.state.imageData_name = []
      this.state.imageData_nftData = []
      this.state.imageData_mimeType = []
      this.state.imageData_category = []
      this.state.imageData_price = []
      this.state.imageData_id = []
      this.state.approved = []
      this.state.transactions = []
      

      var numtofeature = 3

      fetch('https://rpc.zoo-harmony.com/rpc/harmony.json', {
        mode: 'cors',
      })
        .then(response => {
         
          return response.json()
        })
        .then(data => {

          for (var b = numtofeature; b--; ) {
            var randomnum = parseInt(randomNumber(0, data.length))
            
            this.setState({
              images: [...this.state.images, data[randomnum]],
              imageData_name: [...this.state.imageData_name, data[randomnum].name],
              imageData_nftData: [...this.state.imageData_nftData, data[randomnum].nftData],
              imageData_mimeType: [...this.state.imageData_mimeType, data[randomnum].mimeType],
              imageData_category: [...this.state.imageData_category, data[randomnum].category],
              imageData_price: [...this.state.imageData_price, data[randomnum].price],
              imageData_owner: [...this.state.imageData_owner, data[randomnum].owner],
              imageData_id: [...this.state.imageData_id, randomnum],
            })
            console.log('number feautre:', b)
            this.setState({ ready: true })
          }
        })
        .catch(err => {
          // Do something for an error here
          
        })
    }, 1234)
  }
}

export default Home
