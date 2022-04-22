
<template>
   
    <div class="row">
      <div class="afterLogin" style="display: none">
        <button type="button"
          class="btn btn-warning pull-left"
          id="createToken"
          data-toggle="modal"
          data-target="#createTokenModal">
          YTT 토큰 발행
        </button>
        <button type="button"
          class="btn btn-warning pull-right"
          id="approve"
          onclick="App.approve()">
          토큰 판매 승인
        </button>
        <button type="button"
          class="btn btn-danger pull-right"
          id="cancelApproval"
          onclick="App.cancelApproval()">
          토큰 판매 승인 취소
        </button>
      </div>

      
      <div class="modal fade" tabindex="-1" role="dialog" id="createTokenModal">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">         
            <div class="modal-body">
              <div class="form-group">
                <label for="video-id">비디오 아이디</label>
                <input type="text" class="form-control" id="video-id" onchange="App.checkTokenExists()">
                <p class="help-block" id="t-message"></p>
              </div>         
              <div class="form-group">
                <label for="title">제목</label>
                <input type="text" class="form-control" id="title">           
              </div>   
              <div class="form-group">
                <label for="author">유튜버</label>
                <input type="text" class="form-control" id="author">           
              </div>
              <div class="form-group">
                <label for="date-created">게시일</label>
                <input type="text" class="form-control" id="date-created">           
              </div>         
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
              <button type="button" class="btn btn-primary btn-create" onclick="App.createToken()" disabled>제출</button>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->
     </div>

    
</template> 

<script> 
import { mapGetters, mapMutations } from 'vuex'
import {cav} from '@/klaytn/caver'
import KlaytnService from '@/klaytn/klaytnService'
import { Spinner } from "spin.js"; 

  export default { 
    created(){ 
    },
    name: 'token_Action',
    computed: { 
      ...mapGetters('wallet', [
        'klaytn'
        ,'accessType'
        ,'keystore'
        ,'password'
      ]
      )
    },
    methods : {
        ...mapMutations('wallet', [
            'setKeystore' 
            ,'setAccessType'
            ,'setPassword'
        ]),
        

        handleImport: async function () {
          const fileReader = new FileReader();
          fileReader.readAsText(event.target.files[0]);
          fileReader.onload = (event) => {
            try { 
              if (!this.checkValidKeystore(event.target.result)) {
                $("#message").text("유효하지 않은 keystore 파일입니다.");
                return;
              }
              this.setKeystore (event.target.result);
              $("#message").text("keystore 통과. 비밀번호를 입력하세요.");
              document.querySelector("#input-password").focus();
            } catch (event) {
              $("#message").text("유효하지 않은 keystore 파일입니다.");
              return;
            }
          }
        },
        handlePassword: async function () {
            this.setPassword (event.target.value );
        },

        handleLogin: async function () {
          if (this.accessType === "keystore") {
            try {
              debugger
                await this.klaytn.loginWithKeystore(this.keystore, this.password)
                debugger
            } catch (e) {
              $("#message").text("비밀번호가 일치하지 않습니다.");
            }
          }
        },
    
        checkValidKeystore: function (keystore) {
          const parsedKeystore = JSON.parse(keystore);

          const isValidKeystore =(
            parsedKeystore.version &&
            parsedKeystore.id &&
            parsedKeystore.address &&
            parsedKeystore.keyring) ?true :false;

          return isValidKeystore;
        },
        handleLogout: async function () {
          this.removeWallet();
          location.reload();
        }            
    }
  }



</script>