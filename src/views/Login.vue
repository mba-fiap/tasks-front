<template>
  <div :class="$style['container']">
    <div :class="$style['form']">
      <div :class="$style['form-container']">
        <img src="/images/fiap.svg" alt="FIAP" title="FIAP" />

        <a-input v-model:value="value" type="email" placeholder="E-mail" />

        <a-input
          v-model:value.lazy="value1"
          type="password"
          placeholder="Senha"
        />
      </div>
    </div>

    <div :class="$style['image']" />
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    flex: 1;
    &-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 20px;
      max-width: 440px;
      border-radius: 16px;
      border: 1px solid #ed1164;
    }
  }
  .image {
    width: 38%;
    height: 100%;
    background: url('/images/background-login.png') no-repeat center center;
    background-size: cover;
  }
}
</style>
