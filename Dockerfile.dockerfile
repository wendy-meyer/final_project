FROM ubuntu:15.10

MAINTAINER Ray King <rayaddisonking@gmail.com>

# Pick up some TF dependencies
RUN apt-get update && apt-get install -y \
        curl \
        libfreetype6-dev \
        libpng12-dev \
        libzmq3-dev \
        pkg-config \
        python-numpy \
        python-pip \
        python-scipy \
        libhdf5-dev \
        graphviz \
        && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN curl -O https://bootstrap.pypa.io/get-pip.py && \
    python get-pip.py && \
    rm get-pip.py

RUN pip --no-cache-dir install \
        
        matplotlib \
        h5py \
        pydot-ng \
        graphviz \
        && \
    python -m ipykernel.kernelspec

# Install TensorFlow CPU version.
ENV TENSORFLOW_VERSION 1.0.0
RUN pip --no-cache-dir install \
    https://storage.googleapis.com/tensorflow/linux/cpu/tensorflow-${TENSORFLOW_VERSION}-cp27-none-linux_x86_64.whl

RUN pip install keras

WORKDIR "/root"

# TensorBoard
EXPOSE 6006

COPY keras.json /root/.keras/keras.json
COPY . /root

CMD ["/bin/bash"]