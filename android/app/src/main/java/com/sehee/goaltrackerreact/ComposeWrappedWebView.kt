package com.sehee.goaltrackerreact

import android.view.ViewGroup
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.compose.runtime.Composable
import androidx.compose.ui.viewinterop.AndroidView
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewAssetLoader.AssetsPathHandler

@Composable
fun ComposeWrappedWebView() {
    AndroidView(
        factory = { context ->
            val assetLoader = WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", AssetsPathHandler(context))
                .build()

            WebView(context).apply {
                @Suppress("SetJavaScriptEnabled")
                settings.javaScriptEnabled = true
                addJavascriptInterface(WebBridge(context, this@apply), "BRIDGE")

                layoutParams = ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT
                )

                webViewClient =  object : WebViewClient() {
                    override fun shouldInterceptRequest(
                        view: WebView,
                        request: WebResourceRequest
                    ): WebResourceResponse? {
                        return assetLoader.shouldInterceptRequest(request.url)
                    }

                    override fun shouldOverrideUrlLoading(view: WebView, url: String?): Boolean {
                        view.loadUrl(url!!)
                        return true
                    }
                }
                loadUrl("https://appassets.androidplatform.net/assets/dist/index.html")
            }
        },
        update = {}
    )
}