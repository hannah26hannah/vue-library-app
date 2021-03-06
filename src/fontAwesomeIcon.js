import Vue from "vue";

// 설치했던 fontawesome-svg-core와 vue-fontawesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

// 설치했던 아이콘파일에서 해당 아이콘만 불러온다.
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faSignInAlt,
  faSignOutAlt,
  faUserCog
} from "@fortawesome/free-solid-svg-icons";

// 불러온 아이콘을 라이브러리에 담는다.
library.add(faGithub, faGoogle);
library.add(faSignInAlt, faSignOutAlt, faUserCog);

// fontawesome아이콘을 Vue탬플릿에 사용할 수 있게 등록해 줍니다.
Vue.component("font-awesome-icon", FontAwesomeIcon);
