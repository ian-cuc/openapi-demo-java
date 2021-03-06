/**
 * Created by liqiao on 8/10/15.
 */

logger.i('Here we go...');

/**
 * _config comes from server-side template. see views/index.jade
 */
dd.config({
    appId: '',
    corpId: _config.corpId,
    timeStamp: _config.timeStamp,
    nonceStr: _config.nonceStr,
    signature: _config.signature,
    jsApiList: ['runtime.info',
        'biz.contact.choose',
        'device.notification.confirm',
        'device.notification.alert',
        'device.notification.prompt',
        'biz.ding.post']
});
logger.i("_config:" + JSON.stringify(_config));

dd.ready(function() {
    logger.i('dd.ready rocks!');

    dd.runtime.info({
        onSuccess: function(info) {
            logger.i('runtime info: ' + JSON.stringify(info));
        },
        onFail: function(err) {
            logger.e('fail: ' + JSON.stringify(err));
        }
    });
    
    dd.runtime.permission.requestAuthCode({
        corpId: _config.corpId,
        onSuccess: function (info) {
            logger.i('authcode: ' + info.code);
            $.ajax({
                url: 'userinfo?code=' + info.code,
                type: 'GET',
                success: function (data, status, xhr) {
                    var info = JSON.parse(data);
                    if (info.errcode === 0) {
                        logger.i('user id: ' + info.userid);
                    }
                    else {
                        logger.e('auth error: ' + data);
                    }
                },
                error: function (xhr, errorType, error) {
                	alert("yinyien");
                    logger.e(errorType + ', ' + error);
                }
            });
            
        },
        onFail: function (err) {
            logger.e('fail: ' + JSON.stringify(err));
        }
    });
});

dd.error(function(err) {
    logger.e('dd error: ' + JSON.stringify(err));
});
