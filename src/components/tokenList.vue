
<template>
   
    <div  >
    <div class="row">
      <div class="afterLogin" style="display: none;">
        <div id="tabs">
          <ul>
            <li><a href="#myTokens">내 보유 토큰</a></li>
            <li><a href="#myTokensSale">내 판매 중 토큰</a></li>
            <li><a href="#allTokens">모든 토큰</a></li>
          </ul>
          <div id="myTokens"></div>
          <div id="allTokens"></div>
          <div id="myTokensSale"></div>
        </div>
      </div>
    </div>

    <div id="spin"></div>   

            
      <div id="MyTokensTemplate" style="display: none;">
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="panel panel-primary">   
            <div class="panel-heading"></div> 
            <div class="panel-body">
              <img style="width: 100%;" src="" title="">
              <br/><br/>
              <strong>영상 ID</strong>: <span class="video-id"></span><br/>
              <strong>유튜버</strong>: <span class="author"></span><br/>
              <strong>게시일</strong>: <span class="date-created"></span><br/>                
            </div>  
            <div class="panel-footer clearfix">         
              <div class="sell-token" style="display: none;">
                <div class="col-sm-6 col-md-8">
                  <input type="number" class="form-control amount" step="0.01" min="0" placeholder="KLAY">  
                </div>
                <div class="col-sm-6 col-md-4">
                  <button type="button" class="btn btn-default btn-sell" onclick="App.sellToken(this)">판매</button> 
                </div>  
              </div> 
            </div>     
          </div>
        </div>
      </div>

      <div id="AllTokensTemplate" style="display: none;">
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="panel panel-primary">   
            <div class="panel-heading"></div> 
            <div class="panel-body">
              <img style="width: 100%;" src="" title="">
              <br/><br/>
              <strong>영상 ID</strong>: <span class="video-id"></span><br/>
              <strong>유튜버</strong>: <span class="author"></span><br/>
              <strong>게시일</strong>: <span class="date-created"></span><br/>                
            </div>  
            <div class="panel-footer clearfix">         
              <div class="buy-token" style="display: none;">
                <div class="col-sm-6 col-md-8">
                  <h5 class="token-price" style="color: green;"></h5>
                </div>
                <div class="col-sm-6 col-md-4">
                  <button type="button" class="btn btn-default btn-buy" onclick="App.buyToken(this)">구매</button> 
                </div>  
              </div> 
            </div>     
          </div>
        </div>
      </div>

      <div id="MyTokensSaleTemplate" style="display: none;">
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="panel panel-primary">   
            <div class="panel-heading"></div> 
            <div class="panel-body">
              <img style="width: 100%;" src="" title="">
              <br/><br/>
              <strong>영상 ID</strong>: <span class="video-id"></span><br/>
              <strong>유튜버</strong>: <span class="author"></span><br/>
              <strong>게시일</strong>: <span class="date-created"></span><br/>                
            </div>  
            <div class="panel-footer clearfix">         
              <h5 class="on-sale" style="color:red;"></h5>    
            </div>         
          </div>
        </div>
      </div>

      <!-- Templates -->
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