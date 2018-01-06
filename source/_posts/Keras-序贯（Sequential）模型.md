---
title: Keras 序贯（Sequential）模型
categories: 人工智能
tags:
  - AI
  - Keras
comments: true
abbrlink: df5635be
date: 2017-10-15 17:30:45
copyright: true
---

## 序贯（Sequential）模型

序贯模型是多个网络层的线性堆叠，可理解为多个网络层的**线性函数**拟合堆叠。

可以通过向`Sequential`模型传递一个layer的list来构造该模型：
```
from keras.models import Sequential
from keras.layers import Dense, Activation

model = Sequential([
Dense(32, units=784),
Activation('relu'),
Dense(10),
Activation('softmax'),
])

```

也可以通过`.add()`方法一个个的将layer加入模型中：
```
model = Sequential()
model.add(Dense(32, input_shape=(784,)))
model.add(Activation('relu'))
```

## 指定输入数据的shape

模型需要知道输入数据的shape，因此，Sequential的第一层需要接受一个关于输入数据shape的参数，后面的各个层则可以自动的推导出中间数据的shape，因此不需要为每个层都指定这个参数。有几种方法来为第一层指定输入数据的shape

- 传递一个`input_shape`的关键字参数给第一层，`input_shape`是一个tuple类型的数据，其中也可以填入`None`，如果填入`None`则表示此位置可能是任何正整数。数据的batch大小不应包含在其中
- 有些2D层，如`Dense`，支持通过指定其输入维度`input_dim`来隐含的指定输入数据shape。一些3D的时域层支持通过参数`input_dim`和`input_length`来指定输入shape。
- 如果你需要为输入指定一个固定大小的`batch_size`（常用于stateful RNN网络），可以传递`batch_size`参数到一个层中，例如你想指定输入张量的batch大小是32，数据shape是（6，8），则你需要传递`batch_size=32`和`input_shape=(6,8)`。

```
model = Sequential()
model.add(Dense(32, input_dim=784))

model = Sequential()
model.add(Dense(32, input_shape=784))
```

## 编译

在训练模型之前，我们需要通过`compile`来对学习过程进行配置。`compile`接收三个参数：

- 优化器optimizer：该参数可指定为已预定义的优化器名，如`rmsprop`、`adagrad`，或一个`Optimizer`类的对象，详情见optimizers
- 损失函数loss：该参数为模型试图最小化的目标函数，它可为预定义的损失函数名，如`categorical_crossentropy`、`mse`，也可以为一个损失函数。详情见losses
- 指标列表`metrics`：对分类问题，我们一般将该列表设置为`metrics=['accuracy']`。指标可以是一个预定义指标的名字,也可以是一个用户定制的函数.指标函数应该返回单个张量,或一个完成`metric_name - > metric_value`映射的字典.请参考性能评估

```
# For a multi-class classification problem
model.compile(optimizer='rmsprop',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# For a binary classification problem
model.compile(optimizer='rmsprop',
              loss='binary_crossentropy',
              metrics=['accuracy'])

# For a mean squared error regression problem
model.compile(optimizer='rmsprop',
              loss='mse')

# For custom metrics
import keras.backend as K

def mean_pred(y_true, y_pred):
    return K.mean(y_pred)

model.compile(optimizer='rmsprop',
              loss='binary_crossentropy',
              metrics=['accuracy', mean_pred])
```

## 训练

Keras以Numpy数组作为输入数据和标签的数据类型。训练模型一般使用fit函数。下面是一些例子。

```
# For a single-input model with 2 classes (binary classification):

model = Sequential()
model.add(Dense(32, activation='relu', input_dim=100))
model.add(Dense(1, activation='sigmoid'))
model.compile(optimizer='rmsprop',
              loss='binary_crossentropy',
              metrics=['accuracy'])

# Generate dummy data
import numpy as np
data = np.random.random((1000, 100))
labels = np.random.randint(2, size=(1000, 1))

# Train the model, iterating on the data in batches of 32 samples
model.fit(data, labels, epochs=10, batch_size=32)

```

```
# For a single-input model with 10 classes (categorical classification):

model = Sequential()
model.add(Dense(32, activation='relu', input_dim=100))
model.add(Dense(10, activation='softmax'))
model.compile(optimizer='rmsprop',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Generate dummy data
import numpy as np
data = np.random.random((1000, 100))
labels = np.random.randint(10, size=(1000, 1))

# Convert labels to categorical one-hot encoding
one_hot_labels = keras.utils.to_categorical(labels, num_classes=10)

# Train the model, iterating on the data in batches of 32 samples
model.fit(data, one_hot_labels, epochs=10, batch_size=32)
```

























