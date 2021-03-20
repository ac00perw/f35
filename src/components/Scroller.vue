<template>
  <div>
    <Scrollama offset="72" @step-enter="stepEnterHandler" id="flexed">
      <div slot="graphic" class="graphic">
        <p>{{currStepId}}</p>
      </div>
      <div data-step-id="1" class="step">
        <img width="100%" src="https://acdubs.com/api/showimage/poster/278518/53" />
      </div>
            <div data-step-id="2" class="step">
        <p>STEP 2</p>
      </div>
            <div data-step-id="3" class="step">
        <p>STEP 3</p>
      </div>
    </Scrollama>
    <img class="breakup" src="//live.staticflickr.com/7025/6509335909_d560397040_n.jpg" width="100%"/>
        <Scrollama offset="72" @step-enter="stepEnterHandler" id="flexed1">
      <div slot="graphic" class="graphic2">
        <p>Hello</p>
      </div>
      <div data-step-id="4" class="step">
        <img width="100%" src="https://acdubs.com/api/showimage/poster/278518/53" />
      </div>
            <div data-step-id="5" class="step">
        <p>STEP 2</p>
      </div>
            <div data-step-id="6" class="step">
        <p>STEP 3</p>
      </div>
    </Scrollama>
  </div>
</template>

<script>

// polyfill for IntersectionObserver
import 'intersection-observer'
import Scrollama from 'vue-scrollama'


export default {
  components: {
    Scrollama
  },
  data() {
    return {
      currStepId: null,
    }
  },
  methods: {
    stepEnterHandler({element, direction, index}) {
      console.log({element, direction, index});
      this.currStepId = element.dataset.stepId
    }
  }
}
</script>

<style src="vue-scrollama/dist/vue-scrollama.css"></style>

<style lang="scss">
// overrides here
#scrollama-container-flexed {  // id="flexed" passed as prop to Scrollama in template
  display: flex;
  flex-direction: row-forward;
  .scrollama-graphic {
    flex: 1;
    height: 80vh;
    top: 10vh;;
  }
  .scrollama-steps {
    flex: 1;
  }
}
#scrollama-container-flexed1 {  // id="flexed" passed as prop to Scrollama in template
  display: flex;
  flex-direction: row-reverse;
  .scrollama-graphic {
    flex: 1;
    height: 80vh;
    top: 10vh;;
  }
  .scrollama-steps {
    flex: 1;
  }
}
</style>

<style scoped>
.step {
  width: 80%;
  max-width: 40rem;
  padding: 10rem 0;
  margin: 0 3rem 15rem;
  border: 1px solid #333;
  background-color: white;
  display: flex;
  justify-content: center;
}
.step.is-active {
  background-color: beige;
}
.graphic {
  height: 80vh;
  background-color: #DDD;
  border: 1px solid #333;
  margin: 0 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
}
.graphic2 {
height: 30vh;
  background-color: #000;
  border: 1px solid #333;
  margin: 0 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  color: white;
}
.breakup {
  margin: 100px 2px;
  padding: 10px;
}
</style>