- [x] 初步解决了bug：line根本没有数据

    - 之前根本没有考虑Line的数据更新到Graph中，可以通过@change捕捉到evt，包含的added和removed就是改变的数据

    - 然后再通过id获取到state.lines中具体的那条line然后再更改其数据
    - 目前Pool的数据根本没有因为被拖拽出去而移动，也就是说那些base64图片一直存在着，只是没有被显示
    - 明天给pool绑个change，行为和line一样就可以
    - 没有办法再上传的原因应该也是这个
- [x] 裁剪
    - 用vueCropper实现的
    - 同时附带了命名功能
    - 简单的来说就是剪裁，获取新的data64，然后更新，抛出更新事件让Line去修改
- [ ] 拖拽上传
    - 