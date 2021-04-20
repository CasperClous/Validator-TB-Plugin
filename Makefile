FILES=manifest.json \
popup/* icons/* LICENSE

XPI_NAME=validator.xpi

.PHONY: clean

all: $(XPI_NAME)

$(XPI_NAME): $(FILES)
	zip -r $@ $^

clean:
	rm *.xpi
