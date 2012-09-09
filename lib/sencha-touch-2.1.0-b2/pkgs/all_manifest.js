Ext.Loader.setConfig({
    enabled: true,
    disableCaching: !/[?&](cache|breakpoint)/i.test(window.location.search)
});

