/*
This file is part of FreeTube.

FreeTube is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

FreeTube is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with FreeTube.  If not, see <http://www.gnu.org/licenses/>.
*/

const mainHeaderTemplate = require('./templates/mainHeader.html');
const aboutTemplate = require('./templates/about.html');
const settingsTemplate = require('./templates/settings.html');
const videoListTemplate = require('./templates/videoTemplate.html');
const playerTemplate = require('./templates/player.html');
const channelTemplate = require('./templates/channelView.html');
const progressViewTemplate = require('./templates/progressView.html');
const playlistViewTemplate = require('./templates/playlistView.html');

/*
* Progress view
*
* Shows progress bar on bottom of application.
*
* seen: Toggles visibility of view
* progressWidth: sets width of the progress bar
*/
let progressView = new Vue({
  el: '#progressView',
  data: {
    seen: true,
    progressWidth: 0
  },
  template: progressViewTemplate
});

let loadingView = new Vue({
  el: '#loading',
  data: {
    seen: false
  }
});

let searchFilter = new Vue({
  el: '#searchFilter',
  data: {
    seen: false
  }
});

let noSubscriptions = new Vue({
  el: '#noSubscriptions',
  data: {
    seen: false
  }
});

let sideNavBar = new Vue({
  el: '#sideNav',
  data: {
    distractionFreeMode: false
  },
  methods: {
    subscriptions: (event) => {
      hideViews();
      if(subscriptionView.videoList.length === 0){
        loadingView.seen = true;
      }
      headerView.seen = true;
      headerView.title = 'Latest Subscriptions';
      subscriptionView.seen = true;
      loadSubscriptions();
    },
    popular: (event) => {
      hideViews();
      if (loadingView.seen !== false){
        loadingView.seen = false;
      }
      if(popularView.videoList.length === 0){
        loadingView.seen = true;
      }
      headerView.seen = true;
      headerView.title = 'Most Popular';
      popularView.seen = true;
      showMostPopular();
    },
    trending: (event) => {
      hideViews();
      if (loadingView.seen !== false){
        loadingView.seen = false;
      }
      if(trendingView.videoList.length === 0){
        loadingView.seen = true;
      }
      headerView.seen = true;
      headerView.title = 'Trending';
      trendingView.seen = true;
      showTrending();
    },
    saved: (event) => {
      hideViews();
      if (loadingView.seen !== false){
        loadingView.seen = false;
      }
      else{
        loadingView.seen = true;
      }
      headerView.seen = true;
      headerView.title = 'Favorited Videos';
      savedView.seen = true;
      showSavedVideos();
    },
    history: (event) => {
      hideViews();
      if (loadingView.seen !== false){
        loadingView.seen = false;
      }
      else{
        loadingView.seen = true;
      }
      headerView.seen = true;
      headerView.title = 'Video History';
      historyView.seen = true;
      showHistory();
    },
    settings: (event) => {
      hideViews();
      if (loadingView.seen !== false){
        loadingView.seen = false;
      }
      settingsView.seen = true;
      updateSettingsView();
    },
    about: (event) => {
      hideViews();
      if (loadingView.seen !== false){
        loadingView.seen = false;
      }
      aboutView.seen = true;
    }
  }
});

let headerView = new Vue({
  el: '#mainHeaderView',
  data: {
    seen: true,
    title: 'Latest Subscriptions'
  },
  template: mainHeaderTemplate
});

let subscriptionView = new Vue({
  el: '#subscriptionView',
  data: {
    seen: true,
    isSearch: false,
    videoList: [],
    fullVideoList: [],
  },
  methods: {
    play: (videoId) => {
      loadingView.seen = true;
      playVideo(videoId);
    },
    channel: (channelId) => {
      goToChannel(channelId);
    },
    toggleSave: (videoId) => {
      addSavedVideo(videoId);
    },
    copyYouTube: (videoId) => {
      const url = 'https://youtube.com/watch?v=' + videoId;
      clipboard.writeText(url);
      showToast('URL has been copied to the clipboard');
    },
    copyInvidious: (videoId) => {
      const url = invidiousInstance + '/watch?v=' + videoId;
      clipboard.writeText(url);
      showToast('URL has been copied to the clipboard');
    },
    history: (videoId) => {
      removeFromHistory(videoId);
    },
    miniPlayer: (videoId) => {
      ft.log(videoId);
      clickMiniPlayer(videoId);
    }
  },
  template: videoListTemplate
});

let popularView = new Vue({
  el: '#popularView',
  data: {
    seen: false,
    isSearch: false,
    videoList: []
  },
  methods: {
    play: (videoId) => {
      loadingView.seen = true;
      playVideo(videoId);
    },
    channel: (channelId) => {
      goToChannel(channelId);
    },
    toggleSave: (videoId) => {
      addSavedVideo(videoId);
    },
    copyYouTube: (videoId) => {
      const url = 'https://youtube.com/watch?v=' + videoId;
      clipboard.writeText(url);
      showToast('URL has been copied to the clipboard');
    },
    copyInvidious: (videoId) => {
      const url = invidiousInstance + '/watch?v=' + videoId;
      clipboard.writeText(url);
      showToast('URL has been copied to the clipboard');
    },
    history: (videoId) => {
      removeFromHistory(videoId);
    },
    miniPlayer: (videoId) => {
      clickMiniPlayer(videoId);
    }
  },
  template: videoListTemplate
});

let trendingView = new Vue({
  el: '#trendingView',
  data: {
    seen: false,
    isSearch: false,
    videoList: []
  },
  methods: {
    play: (videoId) => {
      loadingView.seen = true;
      playVideo(videoId);
    },
    channel: (channelId) => {
      goToChannel(channelId);
    },
    toggleSave: (videoId) => {
      addSavedVideo(videoId);
    },
    copyYouTube: (videoId) => {
      const url = 'https://youtube.com/watch?v=' + videoId;
      clipboard.writeText(url);
      showToast('URL has been copied to the clipboard');
    },
    copyInvidious: (videoId) => {
      const url = invidiousInstance + '/watch?v=' + videoId;
      clipboard.writeText(url);
      showToast('URL has been copied to the clipboard');
    },
    history: (videoId) => {
      removeFromHistory(videoId);
    },
    miniPlayer: (videoId) => {
      clickMiniPlayer(videoId);
    }
  },
  template: videoListTemplate
});

let savedView = new Vue({
  el: '#savedView',
  data: {
    seen: false,
    isSearch: false,
    videoList: []
  },
  methods: {
    play: (videoId) => {
      loadingView.seen = true;
      playVideo(videoId);
    },
    channel: (channelId) => {
      goToChannel(channelId);
    },
    toggleSave: (videoId) => {
      toggleSavedVideo(videoId);
    },
    copyYouTube: (videoId) => {
      const url = 'https://youtube.com/watch?v=' + videoId;
      clipboard.writeText(url);
      showToast('URL has been copied to the clipboard');
    },
    copyInvidious: (videoId) => {
      const url = invidiousInstance + '/watch?v=' + videoId;
      clipboard.writeText(url);
      showToast('URL has been copied to the clipboard');
    },
    history: (videoId) => {
      removeFromHistory(videoId);
    },
    miniPlayer: (videoId) => {
      clickMiniPlayer(videoId);
    }
  },
  template: videoListTemplate
});

let historyView = new Vue({
  el: '#historyView',
  data: {
    seen: false,
    isSearch: false,
    videoList: []
  },
  methods: {
    play: (videoId) => {
      loadingView.seen = true;
      playVideo(videoId);
    },
    channel: (channelId) => {
      goToChannel(channelId);
    },
    toggleSave: (videoId) => {
      addSavedVideo(videoId);
    },
    copyYouTube: (videoId) => {
      const url = 'https://youtube.com/watch?v=' + videoId;
      clipboard.writeText(url);
      showToast('URL has been copied to the clipboard');
    },
    copyInvidious: (videoId) => {
      const url = invidiousInstance + '/watch?v=' + videoId;
      clipboard.writeText(url);
      showToast('URL has been copied to the clipboard');
    },
    history: (videoId) => {
      removeFromHistory(videoId);
    },
    miniPlayer: (videoId) => {
      clickMiniPlayer(videoId);
    }
  },
  template: videoListTemplate
});

let playlistView = new Vue({
  el: '#playlistView',
  data: {
    seen: false,
    playlistId: '',
    channelName: '',
    channelId: '',
    thumbnail: '',
    title: '',
    videoCount: '',
    viewCount: '',
    description: '',
    lastUpdated: '',
    videoList: []
  },
  methods: {
    play: (videoId) => {
      loadingView.seen = true;
      playVideo(videoId, playlistView.playlistId);

      backButtonView.lastView = playlistView
    },
    channel: (channelId) => {
      goToChannel(channelId);

      backButtonView.lastView = playlistView
    },
    toggleSave: (videoId) => {
      addSavedVideo(videoId);
    },
    copyYouTube: (videoId) => {
      const url = 'https://youtube.com/watch?v=' + videoId;
      clipboard.writeText(url);
      showToast('URL has been copied to the clipboard');
    },
    copyInvidious: (videoId) => {
      const url = invidiousInstance + '/watch?v=' + videoId;
      clipboard.writeText(url);
      showToast('URL has been copied to the clipboard');
    },
    history: (videoId) => {
      removeFromHistory(videoId);
    }
  },
  template: playlistViewTemplate
});

let aboutView = new Vue({
  el: '#aboutView',
  data: {
    seen: false,
    rssFeed: [],
    versionNumber: electron.remote.app.getVersion()
  },
  template: aboutTemplate
});

let settingsView = new Vue({
  el: '#settingsView',
  data: {
    seen: false,
    useTheme: false,
    useTor: false,
    apiKey: '',
    history: true,
    autoplay: true,
    autoplayPlaylists: true,
    playNextVideo: false,
    subtitles: false,
    updates: true,
    localScrape: true,
    region: 'US',
    proxyAddress: false,
    invidiousInstance: 'https://invidio.us',
    checkProxyResult: false,
    proxyTestLoading: false,
    debugMode: false,
    distractionFreeMode: false,
    defaultVolume: 1,
    defaultVideoSpeed: 1,
    subWatched: false,
    videoView: 'grid',
  },
  methods: {
    checkProxy() {
      this.checkProxyResult = false;
      this.proxyTestLoading = true;
      let data = {
        proxyAddress: this.proxyAddress,
      };
      electron.ipcRenderer.send("setProxy", data);

      proxyRequest(() => {
        $.ajax({
          url: "https://ipinfo.io/json",
          dataType: 'json',
        }).done(response => {
          console.log(response);
          this.checkProxyResult = response;
        })
        .fail((xhr, textStatus, error) => {
          console.log(xhr);
          console.log(textStatus);
          showToast('Proxy test failed');
        }).always(() =>{
          this.proxyTestLoading = false;
          if (!useTor) {
            electron.ipcRenderer.send("setProxy", {});
          }
        });
      })
    },
    setDistractionFreeMode(setting) {
      settingsView.distractionFreeMode = setting;
      sideNavBar.distractionFreeMode = setting;
      channelView.distractionFreeMode = setting;
      playerView.distractionFreeMode = setting;
    },
  },
  computed: {
    proxyTestButtonText() {
      return this.proxyTestLoading ? "LOADING..." : "TEST PROXY"
    },
    volumeHtml() {
      return Math.round(this.defaultVolume * 100);
    }
  },
  template: settingsTemplate
});

let searchView = new Vue({
  el: '#searchView',
  data: {
    seen: false,
    isSearch: true,
    page: 1,
    videoList: []
  },
  methods: {
    play: (videoId) => {
      loadingView.seen = true;
      playVideo(videoId);

      backButtonView.lastView = searchView
    },
    channel: (channelId) => {
      goToChannel(channelId);

      backButtonView.lastView = searchView
    },
    toggleSave: (videoId) => {
      addSavedVideo(videoId);
    },
    copyYouTube: (videoId) => {
      const url = 'https://youtube.com/watch?v=' + videoId;
      clipboard.writeText(url);
      showToast('URL has been copied to the clipboard');
    },
    copyInvidious: (videoId) => {
      const url = invidiousInstance + '/watch?v=' + videoId;
      clipboard.writeText(url);
      showToast('URL has been copied to the clipboard');
    },
    nextPage: () => {
      ft.log(searchView.page);
      search(searchView.page);
    },
    playlist: (playlistId) => {
      showPlaylist(playlistId);

      backButtonView.lastView = searchView
    },
    miniPlayer: (videoId) => {
      clickMiniPlayer(videoId);
    }
  },
  template: videoListTemplate
});

let channelView = new Vue({
  el: '#channelView',
  data: {
    seen: false,
    id: '',
    name: '',
    icon: '',
    baner: '',
    subCount: '',
    subButtonText: '',
    description: '',
    distractionFreeMode: false
  },
  methods: {
    subscription: (channelId) => {
      let channelData = {
        channelId: channelView.id,
        channelName: channelView.name,
        channelThumbnail: channelView.icon
      };
      toggleSubscription(channelData);
    },
  },
  template: channelTemplate
});

let channelVideosView = new Vue({
  el: '#channelVideosView',
  data: {
    seen: false,
    channelId: '',
    isSearch: true,
    page: 2,
    videoList: []
  },
  methods: {
    play: (videoId) => {
      loadingView.seen = true;
      playVideo(videoId);
    },
    channel: (channelId) => {
      goToChannel(channelId);
    },
    toggleSave: (videoId) => {
      addSavedVideo(videoId);
    },
    nextPage: () => {
      channelNextPage();
    },
    copyYouTube: (videoId) => {
      const url = 'https://youtube.com/watch?v=' + videoId;
      clipboard.writeText(url);
      showToast('URL has been copied to the clipboard');
    },
    copyInvidious: (videoId) => {
      const url = invidiousInstance + '/watch?v=' + videoId;
      clipboard.writeText(url);
      showToast('URL has been copied to the clipboard');
    },
    history: (videoId) => {
      removeFromHistory(videoId);
    },
    miniPlayer: (videoId) => {
      clickMiniPlayer(videoId);
    }
  },
  template: videoListTemplate
});

let playerView = new Vue({
  el: '#playerView',
  data: {
    seen: false,
    playlistSeen: false,
    legacySeen: false,
    firstLoad: true,
    currentTime: undefined,
    publishedDate: '',
    videoUrl: '',
    videoId: '',
    channelId: '',
    channelIcon: '',
    channelName: '',
    subscribedText: '',
    subscriptionCount: '',
    savedText: '',
    savedIconType: 'far',
    description: '',
    videoThumbnail: '',
    subtitleHtml: '',
    currentQuality: '',
    videoAudio: '',
    validAudio: false,
    video360p: '',
    valid360p: false,
    video720p: '',
    valid720p: false,
    videoDash: '',
    validDash: true,
    videoLive: '',
    validLive: false,
    embededHtml: '',
    currentSpeed: 1,
    lengthSeconds: 0,
    videoTitle: '',
    videoViews: '',
    likePercentage: 0,
    videoLikes: 0,
    videoDislikes: 0,
    playerSeen: true,
    playlistTitle: '',
    playlistChannelName: '',
    playlistIndex: 1,
    playlistTotal: 1,
    playlistLoop: false,
    playlistShuffle: false,
    playlistShowList: true,
    recommendedVideoList: [],
    playlistVideoList: [],
    distractionFreeMode: false
  },
  methods: {
    channel: (channelId) => {
      goToChannel(channelId);
    },
    subscription: () => {
      let channelData = {
        channelId: playerView.channelId,
        channelName: playerView.channelName,
        channelThumbnail: playerView.channelIcon
      };
      toggleSubscription(channelData);
    },
    quality: (url, qualityText) => {
      ft.log(url);
      ft.log(qualityText);
      if(playerView.legacySeen === true){
        // Update time to new url
        const currentPlayBackTime = $('.videoPlayer').get(0).currentTime;
        ft.log(currentPlayBackTime);
        playerView.videoUrl = url;
        playerView.currentQuality = qualityText;
        setTimeout(() => {$('.videoPlayer').get(0).currentTime = currentPlayBackTime; $('.videoPlayer').get(0).play();}, 100);
      }
    },
    embededPlayer: () => {
      playerView.playerSeen = false;
      playerView.legacySeen = false;
      playerView.currentTime = undefined;
      checkedVideoSettings = false;
    },
    legacyFormats: () => {
      if (typeof(player) !== 'undefined') {
          playerView.currentTime = player.currentTime;
      }

      checkedVideoSettings = false;

      playerView.playerSeen = false;
      playerView.legacySeen = true;
    },
    dashFormats: () => {
      if (typeof($('#legacyPlayer').get(0)) !== 'undefined') {
          playerView.currentTime = $('#legacyPlayer').get(0).currentTime;
      }
      checkedVideoSettings = false;

      playerView.legacySeen = false;
      playerView.playerSeen = true;
    },
    copyYouTube: (videoId) => {
      const url = 'https://youtube.com/watch?v=' + videoId;
      clipboard.writeText(url);
      showToast('URL has been copied to the clipboard');
    },
    openYouTube: (videoId) => {
      shell.openExternal('https://youtube.com/watch?v=' + videoId);
    },
    copyInvidious: (videoId) => {
      const url = invidiousInstance + '/watch?v=' + videoId;
      clipboard.writeText(url);
      showToast('URL has been copied to the clipboard');
    },
    openInvidious: (videoId) => {
      shell.openExternal(invidiousInstance + '/watch?v=' + videoId);
    },
    save: (videoId) => {
      toggleSavedVideo(videoId);
    },
    play: (videoId, playlistId = '') => {
      loadingView.seen = true;
      playVideo(videoId, playlistId);
    },
    loop: () => {
      let legacyPlayer = $('.videoPlayer').get(0);

      if (legacyPlayer.loop === false) {
        legacyPlayer.loop = true;
        showToast('Video loop has been turned on.');
      }
      else{
        legacyPlayer.loop = false;
        showToast('Video loop has been turned off.')
      }
    },
    playlist: (playlistId) => {
      showPlaylist(playlistId);
    },
    playlistLoopToggle: () => {
      if (playerView.playlistLoop !== false) {
        showToast('Playlist will no longer loop');
        playerView.playlistLoop = false;
      }
      else {
        showToast('Playlist will now loop');
        playerView.playlistLoop = true;
      }
    },
    playlistShuffleToggle: () => {
      if (playerView.playlistShuffle !== false) {
        showToast('Playlist will no longer shuffle');
        playerView.playlistShuffle = false;
      }
      else{
        showToast('Playlist will now shuffle');
        playerView.playlistShuffle = true;
      }
    },
  },
  computed: {
    thumbnailInterval: function() {
      if (this.lengthSeconds < 120) {
          return 1;
      } else if (this.lengthSeconds < 300) {
          return 2;
      } else if (this.lengthSeconds < 900) {
          return 5;
      } else {
          return 10;
      }
    },
    storyBoardUrl: function() {
      return invidiousInstance + '/api/v1/storyboards/' + this.videoId + '?height=90';
    }
  },
  template: playerTemplate
});

let backButtonView = new Vue({
  el: '#backButton',
  data: {
    lastView: false
  },
  methods: {
    back: function() {
      // variable here because this.lastView gets reset in hideViews()
      const isSearch = this.lastView.$options.el === "#searchView";

      hideViews();
      loadingView.seen = false;

      // Check if lastView was search
      if(isSearch) {
        // Change back to searchView
        headerView.seen = true;
        headerView.title = 'Search Results';
        searchView.seen = true;

        // reset this.lastView
        this.lastView = false;
      } else {
        // if not search then this.lastView has to be playlistView

        // Change back to playlistView
        playlistView.seen = true;

        // Check if searchView has videos if it does set this.lastView as searchView
        this.lastView = searchView.videoList.length > 0 ? searchView : false;
      }
    }
  },
  computed: {
    canShowBackButton: function() {
      // this.lastView can be either searchView or playlistView
      return !!this.lastView && !this.lastView.seen && this.lastView.videoList.length > 0;
    }
  },
});

function hideViews() {
  if (playerView.seen !== false && (playerView.playerSeen || playerView.legacySeen)) {
    let lengthSeconds = 0;
    let duration = 0;

    if (playerView.legacySeen === false) {
      lengthSeconds = player.currentTime;
      duration = player.duration;
    }
    else {
      lengthSeconds = $('.videoPlayer').get(0).currentTime;
      duration = $('.videoPlayer').get(0).duration;
    }

    updateWatchProgress(playerView.videoId, lengthSeconds);

    let videoIndex = subscriptionView.videoList.findIndex(x => x.id === playerView.videoId);

    if (videoIndex !== -1) {
      subscriptionView.videoList[videoIndex].watched = true;
      subscriptionView.videoList[videoIndex].progressPercentage = (lengthSeconds / duration) * 100;
    }
  }

  subscriptionView.seen = false;
  noSubscriptions.seen = false;
  aboutView.seen = false;
  headerView.seen = false;
  searchView.seen = false;
  settingsView.seen = false;
  popularView.seen = false;
  trendingView.seen = false;
  savedView.seen = false;
  historyView.seen = false;
  playlistView.seen = false;
  playerView.seen = false;
  channelView.seen = false;
  channelVideosView.seen = false;
  backButtonView.lastView = false;
}
