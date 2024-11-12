const maxStr = 50;

const checkChoose = (rule, value, callback) => {
  console.warn('checkFavoriteFood', value);
  if (value.lenght == 0) {
    callback(new Error('选择不能为空'));
  } else {
    callback();
  }
};

const checkTotal = (rule, value, callback) => {
  if (value) {
    callback();
  } else {
    let tip = '';

    if (value * 1 === 0) {
      tip = '金额应大于0';
    }

    if (tip) {
      callback(new Error(tip));
    } else {
      callback();
    }
  }
};

//全局表单校验
const rules = {
  test: [
    { required: true, message: '证书编号不能为空', trigger: 'blur' },
    { min: 2, max: 20, message: '名称长度必须介于 2 和 20 之间', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change'],
    },
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: '请输入正确的手机号码',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 5, max: 20, message: '密码长度必须介于 5 和 20 之间', trigger: 'blur' },
  ],
  email: [
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change'],
    },
  ],
  phonenumber: [
    { required: true, message: '号码不能为空', trigger: 'blur' },
    // {
    //   pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
    //   message: '请输入正确的手机号码',
    //   trigger: 'blur',
    // },
  ],
  certNumber: [
    { required: true, message: '证书编号不能为空', trigger: 'blur' },
    { max: maxStr, message: '长度不能超过' + maxStr, trigger: 'blur' },
  ],
  certName: [
    {
      required: true,
      message: '证书名称不能为空',
      trigger: 'blur',
    },
    { max: maxStr, message: '长度不能超过' + maxStr, trigger: 'blur' },
  ],
  prjName: [
    {
      required: true,
      message: '项目名称不能为空',
      trigger: 'blur',
    },
    { max: maxStr, message: '长度不能超过' + maxStr, trigger: 'blur' },
  ],
  authority: [{ required: true, message: '颁发机构不能为空', trigger: 'blur' }],
  certType: [{ required: true, message: '证书类型不能为空', trigger: ['blur', 'change'] }],
  foreignCertName: [
    { required: true, message: '请选择', trigger: ['blur'] },
    { validator: checkChoose, trigger: ['blur', 'change'] },
  ],
  cert: [{ required: true, message: '证书类型不能为空', trigger: ['blur', 'change'] }],
  certParentType: [{ required: true, message: '证书大类不能为空', trigger: ['blur', 'change'] }],
  certChildType: [{ required: true, message: '证书中类不能为空', trigger: ['blur', 'change'] }],
  issueDate: [{ required: true, message: '颁发时间不能为空', trigger: 'blur' }],
  validity: [{ required: true, message: '证书有效年限不能为空', trigger: 'change' }],
  expireDate: [{ required: true, message: '过期时间不能为空', trigger: ['blur', 'change'] }],
};

//身份证格式校验
function isValidID(id) {
  const pattern =
    /^[1-9]\d{5}(18|19|20|21|22)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|[Xx])$/;
  return pattern.test(id);
}

export default {
  rules,
  checkChoose,
  checkTotal,
  isValidID,
};
