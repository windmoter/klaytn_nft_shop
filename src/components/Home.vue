 <template>
  <div class="container">
   <LoginAuth  /> 

   <TokenAction  /> 

   <TokenList  /> 
 
  </div>

 
</template> 


<script> 
import { mapGetters, mapMutations } from 'vuex'
import KlaytnService from '@/klaytn/klaytnService'

import LoginAuth from '@/components/loginAuth.vue';  
import TokenAction from '@/components/tokenAction.vue';  
import TokenList from '@/components/tokenList.vue';  
import EventBus from '@/utils/EventBus';
export default {
  
  name: 'Shop_NFT',
  components: {
    LoginAuth ,
    TokenAction,
    TokenList
  },
  async mounted () {
    await this.connect()	
  },

  computed: {
      ...mapGetters('wallet', [
        'klaytn'
        ,'myaddress'
        ,'accessType'
        ,'keystore'
        ,'password'
      ]
      )
  },

  methods: { 
    ...mapMutations('wallet', [
      'setKlaytn',
      'setIsConnectWallet',
      'setMyAddress',
      'setBalance'
    ]),
  async connect () {
    const klaytn = new KlaytnService()

    this.setKlaytn(klaytn)
    const address = await klaytn.init()      

    if (address) {
      this.setMyAddress(address)

      this.getBalance()
      this.setIsConnectWallet(true)
      debugger
      EventBus.$emit('changeUIview', {address         });

    } else {
      this.setIsConnectWallet(false)
    }
  },  
          
    async getBalance () { 
        if (this.myaddress) {        
        const balance = await this.klaytn.getBalance(this.myaddress)        
        this.setBalance(balance)
      }
    },        
  },

  data() {
    return {
 
    };
  },

  created() { 
  },

  computed: {
 
  },
 

};
</script>
 
   
