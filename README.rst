PDO
===

``PDO`` is a remote download service with decent experiences (but still undone 😂).


API
----

:Tasks:

GET http://0.0.0.0:8000/tasks/{task_id}

::
    
    {
      "data": {
        "status": "下载中",
        "add_time": "2017-02-11T23:41:03.744903",
        "url": "http://tmp.kxrr.us/WebStorm-2016.3.3.dmg",
        "cookies": null,
        "headers": null,
        "id": 7,
        "_status": 1,
        "progress": 0.0003519103957347905,
        "total_size": 231288990
      },
      "code": 200
    }
