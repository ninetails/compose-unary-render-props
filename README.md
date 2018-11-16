# compose-unary-render-props

> Another Component for composing render props components

## Archived and not published on npm

You can use [react-composer](https://github.com/jamesplease/react-composer) that allows you to reuse previous props too.

## How it works

It just transforms this

```js
const initialProps = {...}
<ComponentOne {...initialProps}>
  {propsOne => (
    <ComponentTwo {...initialProps} {...propsOne}>
      {propsTwo => (
        <ComponentThree {...initialProps} {...propsTwo}>
          {propsThree => 'children'}
        </ComponentThree>
      )}
    </ComponentTwo>
  )}
</ComponentOne>
```

into:

```js
const initialProps = {...}
<ComposeUnaryRenderProps
  components={[ComponentOne, ComponentTwo, ComponentThree]}
  {...initialProps}
>
  {data => 'children'}
</ComposeUnaryRenderProps>
```

## What makes it different from other composing components?

It passes previous props to next components to be used, but sometimes you need to these components to repass previous props too. And it always passes initial props. Also you may need to pass props for one specific component, I do recommend that you use **withProps** from `recompose` for that.
