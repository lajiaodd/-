import './js/inc/weapp-adapter'
import './js/inc/symbol'
 
import Main from './js/main' 

window.G = new Main();
G.version  = 0.1;
G.local    = false;  //是否本地调试
G.serUrl   = 'https://ytds.aslk2018.com/yt.php';
G.localUrl = 'http://ytds/yt.php';

G.goPage();
window.C = G.comm;
