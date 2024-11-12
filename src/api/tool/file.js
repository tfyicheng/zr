import request from '@/utils/request';

//上传文件
export function uploadFile(data) {
  return request({
    url: '/file/upload',
    method: 'post',
    data: data,
  });
}

// 公共方法-上传文件
export function uploadFile2(file) {
  const formData = new FormData();
  formData.append('file', file);
  request({
    url: '/file/upload',
    method: 'post',
    data: formData,
  }).then((res) => {
    alert(JSON.stringify(res));
  });
}

// 文件下载
export function downloadFile(fileId) {
  // return request({
  //   url: '/file/download/' + fileId,
  //   method: 'get',
  //   responseType: 'blob',
  // });
}

//文件预览地址 水印内容,不填则取默认配置的水印
export function getFilePreviewUrl(fileId, watermark = null) {
  return request({
    url: '/file/preview/' + fileId,
    method: 'get',
    params: watermark,
  });
}
