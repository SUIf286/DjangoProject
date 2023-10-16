from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.contrib.auth import authenticate
import pymysql
import base64


def login(request):
    return render(request, 'login.html')


def register(request):
    if request.method == 'GET':
        username = request.GET.get('username')
        password = request.GET.get('password')

        # 检查用户名和密码是否为空
        if not username or not password:
            return JsonResponse({'success': False, 'message': '用户名和密码不能为空'})

        # 检查用户名是否已存在
        if User.objects.filter(username=username).exists():
            return JsonResponse({'success': False, 'message': '用户名已存在'})


        # 创建新的用户
        user = User.objects.create_user(username=username, password=password)

        '''user = User()
        user.is_active = True
        user.username = username
        user.password = password  # 明文密码，非常不安全！
        '''
        user.save()
        return JsonResponse({'success': True, 'message': '注册成功'})
    else:
        return JsonResponse({'success': False, 'message': '无效的请求方法'})

def signin(request):
    if request.method == 'GET':
        username = request.GET.get('username')
        password = request.GET.get('password')
        print(username)
        print(password)

        user = authenticate(request, username=username, password=password)
        print(user)
        if user is not None:
            # 登录成功
            print('登录成功')
            return JsonResponse({'success': True, 'message': '登录成功'})
        else:
            # 登录失败
            return JsonResponse({'success': False, 'message': '用户名或密码错误'})
    else:
        return JsonResponse({'success': False, 'message': '无效的请求方法'})















def mb(request):
    img_list = []
    conn = pymysql.connect(
        host='127.0.0.1',  # 连接名称，默认127.0.0.1
        user='Yklsuif',  # 用户名
        passwd='@Ykl127094',  # 密码
        port=3306,  # 端口，默认为3306
        db='test',  # 数据库名称
        charset='utf8',  # 字符编码
    )
    cursor = conn.cursor()
    cursor.execute("SELECT img FROM images LIMIT 1")

    B_img = cursor.fetchone()[0]
    base64_image = base64.b64encode(B_img)
    # b64encode是编码，b64decode是解码
    # base64.b64decode(base64data)
    base64_data_str = "data:image/jpg;base64," + str(base64_image, encoding="utf-8")

    cursor.close()  # 关闭游标
    conn.close()  # 关闭连接

    return render(request, 'test.html', context={'img': base64_data_str})
