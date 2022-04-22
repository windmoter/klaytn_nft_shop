
<template>
    <div class="row">
      <div class="col-md-8 col-md-offset-2">    
        <h3 class="text-center">크립토 <span style="color: red;">상품</span> 썸네일</h3>
        <h3 class="text-center">
          <code>Collect, Buy and Sell product Thumbnails!</code>           
          <button type="button" 
                  class="btn btn-info pull-right" 
                  id="login" 
                  data-toggle="modal"
                  data-target="#loginModal">
                  로그인
          </button>
          <button type="button" 
                  class="btn btn-info pull-right" 
                  id="logout" 
                  style="display: none;"
                  v-on:click="this.handleLogout" >
                  로그아웃
          </button>
        </h3>         
        <div class="text-center" id="address"></div>    
      </div>   
    <!-- Modals -->   
    <div class="modal fade" tabindex="-1" role="dialog" id="loginModal">
        <div class="modal-dialog modal-sm">
        <div class="modal-content">         
            <div class="modal-body">
            <div class="form-group">
                <label for="keystore">Keystore</label>
                <input type="file" id="keystore" v-on:change="this.handleImport" >
            </div>
            <div class="form-group">
                <label for="input-password">비밀번호</label>
                <input type="password" class="form-control" id="input-password" v-on:change="this.handlePassword"  >
                <p class="help-block" id="message"></p>
            </div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
            <button type="button" class="btn btn-primary" v-on:click="this.handleLogin"  >제출</button>
            </div>
        </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->  
    </div>

    
</template>mutations

<script> 
import { mapGetters, mapMutations } from 'vuex'
import EventBus from '@/utils/EventBus';
import {cav} from '@/klaytn/caver'
import KlaytnService from '@/klaytn/klaytnService'
import { Spinner } from "spin.js"; 

  export default { 
 
    created(){ 
          EventBus.$on('changeUIview',   address => this.changeUI(address))
    },
    name: 'Shop_NFT_login',
    computed: { 
      ...mapGetters('wallet', [
        'klaytn'
        ,'accessType'
        ,'keystore'
        ,'password'
         ,'myaddress'
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
                this.changeUI(this.myaddress )
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
        
        changeUI: async function (address) {
          $("#loginModal").modal("hide");
          $("#login").hide();
          $("#logout").show();
          $(".afterLogin").show();
          $("#address").append(
            "<br>" + "<p>" + "내 계정 주소: " + address+ "</p>"
          );
         // await this.displayMyTokensAndSale(walletInstance);
         // await this.displayAllTokens(walletInstance);
         // await this.checkApproval(walletInstance);
        },

        handleLogout: async function () {
           this.klaytn.removeWallet();
          location.reload();
        }            
    }
  }



</script>