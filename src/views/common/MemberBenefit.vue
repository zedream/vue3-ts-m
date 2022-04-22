<script setup lang="ts">
import router from '@/router'

function handleToRecharge () {
  router.replace('/recharge')
}

function handleToRefuel () {
  router.replace('/refuel')
}
</script>

<template>
  <div class="member-top">
    <div class="member-rank" />
    <div class="button-box">
      <div class="button recharge" @click="handleToRecharge">
        立即充值
      </div>
      <div class="button refuel" @click="handleToRefuel">
        立即加油
      </div>
    </div>
  </div>
  <div class="member-mid">
    <div class="title">
      会员权益
    </div>
    <div class="member-name-box">
      <div class="member-name" />
      <div class="member-name">
        白银会员
      </div>
      <div class="member-name">
        黄金会员
      </div>
      <div class="member-name">
        白金会员
      </div>
      <div class="member-name">
        钻石会员
      </div>
    </div>
    <div class="benefit-box">
      <div class="benefit">
        加油立返
      </div>
      <div class="benefit-rate">
        <div class="circle">
          3%
        </div>
      </div>
      <div class="benefit-rate">
        <div class="circle">
          4%
        </div>
      </div>
      <div class="benefit-rate">
        <div class="circle">
          4.5%
        </div>
      </div>
      <div class="benefit-rate">
        <div class="circle">
          5%
        </div>
      </div>
    </div>
    <div class="benefit-box">
      <div class="benefit">
        智能推送
      </div>
      <div class="benefit-right">
        <div class="circle">
          <i class="iconfont icon-member-right" />
        </div>
      </div>
      <div class="benefit-right">
        <div class="circle">
          <i class="iconfont icon-member-right" />
        </div>
      </div>
      <div class="benefit-right">
        <div class="circle">
          <i class="iconfont icon-member-right" />
        </div>
      </div>
      <div class="benefit-right">
        <div class="circle">
          <i class="iconfont icon-member-right" />
        </div>
      </div>
    </div>
    <div class="separate-line" />
  </div>
  <div class="member-btm">
    <div class="member-rule" />
  </div>
</template>

<style scoped lang="scss">
.member-top {
  padding: 40px 30px 0;
  box-sizing: border-box;
  .member-rank {
    width: 690px;
    height: 323px;
    background-image: url("~img/other/member-rank.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
  }
  .button-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    .button {
      width: 280px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      border-radius: 40px;
      box-shadow: 0 9px 12px -2px rgba(40, 48, 67, 0.22);
      font-size: 30px;
      font-weight: 600;
    }
    .recharge {
      background: linear-gradient(180deg, #8b9bcc 0%, #616a97 92%);
      color: #FFFFFF;
    }
    .refuel {
      background: linear-gradient(180deg, #F3DEC1 0%, #EDC695 92%);
      color: #343333;
    }
  }
}
.member-mid {
  padding: 50px 30px 0;
  box-sizing: border-box;
  .title {
    font-size: 26px;
    color: #343333;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .member-name-box {
    display: flex;
    align-items: center;
    background: rgba(206, 214, 227, 0.3);
    height: 48px;
    border-radius: 4px;
    .member-name {
      flex: 1;
      font-size: 21px;
      color: #747474;
      font-weight: 600;
      text-align: center;
    }
  }
  .benefit-box {
    display: flex;
    align-items: center;
    margin-top: 40px;
    .benefit {
      flex: 1;
      font-size: 26px;
      color: #343333;
      font-weight: 600;
      border-right: 0.5px dashed #B5BAC9;
      line-height: 40px;
    }
    .benefit-rate, .benefit-right {
      flex: 1;
      font-size: 26px;
      color: #FFFFFF;
      font-weight: 600;
    }
    .circle {
      width: 80px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      border-radius: 50%;
      background: linear-gradient(47deg, #C0CBEE 0%, #7C90D7 100%);
      margin: 0 auto;
    }
  }
  .separate-line {
    height: 10px;
    background: #F2F3F6;
    margin-top: 40px;
  }
}
.member-btm {
  .member-rule {
    width: 750px;
    height: 954px;
    background-image: url("~img/other/member-rule.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
  }
}
</style>
